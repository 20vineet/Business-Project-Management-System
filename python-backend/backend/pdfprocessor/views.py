# import fitz  # PyMuPDF
# import os
# import openai
# import groq
# from rest_framework.response import Response
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.views import APIView
# from rest_framework import status
# from django.conf import settings
# from .models import PDFUpload
# from .serializers import PDFUploadSerializer

# # Set API Keys
# OPENAI_API_KEY = "your-openai-api-key"
# GROQ_API_KEY = "your-groq-api-key"

# class PDFUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         file_serializer = PDFUploadSerializer(data=request.data)
        
#         if file_serializer.is_valid():
#             pdf_instance = file_serializer.save()
#             extracted_text = self.extract_text_from_pdf(pdf_instance.file.path)
            
#             if not extracted_text:
#                 return Response({"error": "Failed to extract text"}, status=status.HTTP_400_BAD_REQUEST)

#             # Send text to Groq or OpenAI API
#             response_data = self.process_with_groq_or_openai(extracted_text)

#             return Response(response_data, status=status.HTTP_200_OK)
        
#         return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def extract_text_from_pdf(self, file_path):
#         """Extracts text from PDF using PyMuPDF"""
#         text = ""
#         try:
#             with fitz.open(file_path) as doc:
#                 for page in doc:
#                     text += page.get_text("text")
#         except Exception as e:
#             print(f"Error extracting text: {e}")
#         return text

#     def process_with_groq_or_openai(self, text):
#         """Send extracted text to Groq or OpenAI API"""
#         use_groq = True  # Toggle between Groq and OpenAI

#         if use_groq:
#             client = groq.Client(api_key=GROQ_API_KEY)
#             response = client.chat.completions.create(
#                 model="mixtral-8x7b-32768",
#                 messages=[{"role": "user", "content": text}]
#             )
#         else:
#             client = openai.OpenAI(api_key=OPENAI_API_KEY)
#             response = client.chat.completions.create(
#                 model="gpt-4-turbo",
#                 messages=[{"role": "user", "content": text}]
#             )

#         return response["choices"][0]["message"]["content"] if response else {"error": "API failed"}

import fitz  # PyMuPDF
import os
import openai
import groq
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from django.conf import settings
from .models import PDFUpload
from .serializers import PDFUploadSerializer

from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

import json

from dotenv import load_dotenv
load_dotenv() 


# Set API Keys
# OPENAI_API_KEY = "your-openai-api-key"
GROQ_API_KEY = str(os.getenv('SECRET_KEY'))

class PDFUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = PDFUploadSerializer(data=request.data)
        
        if file_serializer.is_valid():
            pdf_instance = file_serializer.save()
            extracted_text = self.extract_text_from_pdf(pdf_instance.file.path)
            
            if not extracted_text:
                return Response({"error": "Failed to extract text"}, status=status.HTTP_400_BAD_REQUEST)

            # Send text to Groq or OpenAI API
            response_data = self.process_with_groq_or_openai(extracted_text)

            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def extract_text_from_pdf(self, file_path):
        """Extracts text from PDF using PyMuPDF"""
        text = ""
        try:
            with fitz.open(file_path) as doc:
                for page in doc:
                    text += page.get_text("text")
        except Exception as e:
            print(f"Error extracting text: {e}")
        return text

    def process_with_groq_or_openai(self, text):
        """Send extracted text to Groq or OpenAI API"""
        use_groq = True  # Toggle between Groq and OpenAI

        if use_groq:
            # client = groq.Client(api_key=GROQ_API_KEY)
            # response = client.chat.completions.create(
            #     model="mixtral-8x7b-32768",
            #     messages=[{"role": "user", "content": text}]
            # )
            chat = ChatGroq(temperature=0, model_name="mixtral-8x7b-32768", groq_api_key="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")

            system = """ 
            Strict rules : 
            Don't write any note in response.
            Don't write any extra text.
            Just write response in json format. 

            Task : 
            Extract important values given in below format from the given text. I want the data in below format : 
	The response should be in json.
	The json object has following entities : id, title, description, startDate, endDate, events, status, contactEmail.
	The events attribute has following subattributes : id, projectTitle, title, description, eventDate, notificationPreference.
	The project status should be in these string [PLANNING, IN_PROGRESS, COMPLETED] 
	The notificationPreference should be in these string [ON_DAY, BEFORE_ONE_DAY, BEFORE_THREE_DAYS] 
    The projectTitle attribute in the events sub-object refers to the title of the project.
    The response should only contain the json object. 
    
            """
            human = "{text}"
            prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])

            chain = prompt | chat
            response = chain.invoke(text)
        else:
            client = openai.OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[{"role": "user", "content": text}]
            )
        print(type(response))
        print(response.content)
        print("##############################")
        #Converting response to json
        project_data = json.loads(response.content)
        print(project_data)
        

        return project_data if response else {"error": "API failed"}
        # return response.choices[0].message.content if response else {"error": "API failed"}
        # return response["choices"][0]["message"]["content"] if response else {"error": "API failed"}

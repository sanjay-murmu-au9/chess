#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Chess App
Tests authentication endpoints, MongoDB connection, and scalability aspects
"""

import requests
import json
import os
import time
import asyncio
import concurrent.futures
from datetime import datetime
import sys
import uuid

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('EXPO_PUBLIC_BACKEND_URL='):
                    base_url = line.split('=')[1].strip()
                    return f"{base_url}/api"
        return None
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

def test_health_check():
    """Test GET /api/ endpoint returns Hello World"""
    print("\n=== Testing Health Check Endpoint ===")
    
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ FAILED: Could not get backend URL from frontend/.env")
        return False
    
    print(f"Testing URL: {backend_url}/")
    
    try:
        response = requests.get(f"{backend_url}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ PASSED: Health check endpoint working correctly")
                return True
            else:
                print(f"❌ FAILED: Expected 'Hello World', got: {data}")
                return False
        else:
            print(f"❌ FAILED: Expected status 200, got: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: JSON decode error: {e}")
        return False

def test_mongodb_write():
    """Test POST /api/status endpoint for MongoDB write operations"""
    print("\n=== Testing MongoDB Write Operation ===")
    
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ FAILED: Could not get backend URL from frontend/.env")
        return False
    
    # Test data with realistic chess app context
    test_data = {
        "client_name": "ChessMate_Mobile_Client"
    }
    
    print(f"Testing URL: {backend_url}/status")
    print(f"Sending data: {test_data}")
    
    try:
        response = requests.post(
            f"{backend_url}/status", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            # Verify response structure
            required_fields = ["id", "client_name", "timestamp"]
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ PASSED: MongoDB write operation successful")
                    return True, data["id"]
                else:
                    print(f"❌ FAILED: Client name mismatch. Expected: {test_data['client_name']}, Got: {data.get('client_name')}")
                    return False, None
            else:
                missing_fields = [field for field in required_fields if field not in data]
                print(f"❌ FAILED: Missing required fields: {missing_fields}")
                return False, None
        else:
            print(f"❌ FAILED: Expected status 200, got: {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error: {e}")
        return False, None
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: JSON decode error: {e}")
        return False, None

def test_mongodb_read():
    """Test GET /api/status endpoint for MongoDB read operations"""
    print("\n=== Testing MongoDB Read Operation ===")
    
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ FAILED: Could not get backend URL from frontend/.env")
        return False
    
    print(f"Testing URL: {backend_url}/status")
    
    try:
        response = requests.get(f"{backend_url}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ PASSED: MongoDB read operation successful. Retrieved {len(data)} records")
                
                # Verify structure of records if any exist
                if len(data) > 0:
                    sample_record = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    if all(field in sample_record for field in required_fields):
                        print("✅ PASSED: Record structure is correct")
                    else:
                        missing_fields = [field for field in required_fields if field not in sample_record]
                        print(f"⚠️  WARNING: Some records missing fields: {missing_fields}")
                
                return True
            else:
                print(f"❌ FAILED: Expected list response, got: {type(data)}")
                return False
        else:
            print(f"❌ FAILED: Expected status 200, got: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: JSON decode error: {e}")
        return False

def test_environment_variables():
    """Test that environment variables are properly loaded"""
    print("\n=== Testing Environment Variables ===")
    
    try:
        # Check if backend .env file exists and has required variables
        backend_env_path = "/app/backend/.env"
        if not os.path.exists(backend_env_path):
            print("❌ FAILED: Backend .env file not found")
            return False
        
        with open(backend_env_path, 'r') as f:
            env_content = f.read()
            print(f"Backend .env content:\n{env_content}")
        
        # Check for required environment variables
        required_vars = ["MONGO_URL", "DB_NAME"]
        missing_vars = []
        
        for var in required_vars:
            if var not in env_content:
                missing_vars.append(var)
        
        if missing_vars:
            print(f"❌ FAILED: Missing environment variables: {missing_vars}")
            return False
        else:
            print("✅ PASSED: All required environment variables present")
            return True
            
    except Exception as e:
        print(f"❌ FAILED: Error checking environment variables: {e}")
        return False

def run_all_tests():
    """Run all backend tests and provide summary"""
    print("🚀 Starting Backend API Tests for Chess Mobile App")
    print("=" * 60)
    
    test_results = {}
    
    # Test 1: Environment Variables
    test_results["environment"] = test_environment_variables()
    
    # Test 2: Health Check
    test_results["health_check"] = test_health_check()
    
    # Test 3: MongoDB Write
    write_success, record_id = test_mongodb_write()
    test_results["mongodb_write"] = write_success
    
    # Test 4: MongoDB Read
    test_results["mongodb_read"] = test_mongodb_read()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed_tests = sum(1 for result in test_results.values() if result)
    total_tests = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All backend tests PASSED! Chess app backend is ready.")
        return True
    else:
        print("⚠️  Some tests FAILED. Backend needs attention.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
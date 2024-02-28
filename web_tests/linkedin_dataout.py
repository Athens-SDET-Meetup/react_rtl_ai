from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Set up the Chrome web driver
driver = webdriver.Chrome()

# Navigate to the LinkedIn login page
driver.get('https://www.linkedin.com/login')

# Wait for the page to load
time.sleep(2)

target = driver.find_element(By.ID,'username')

# Scrape data
elements_attributes = driver.find_elements(By.TAG_NAME,'input')

attributes = []
for element in elements_attributes:
    if element.get_attribute('aria-describedby') not in [None, '']:
        element_label = element.get_attribute('aria-describedby')
        element_type = element.get_attribute('type')
        element_id = element.get_attribute(By.ID)
        element_name = element.get_attribute(By.NAME)
        element_class = element.get_attribute(By.CLASS_NAME)
        attributes.append({element_label, element_type, element_id, element_name, element_class})

# adding header 
headerList = ['element', 'type', 'id', 'name', 'class']     

target_attributes = []
target_element_label = target.get_attribute('aria-describedby')
target_element_type = target.get_attribute('type')
target_element_id = target.get_attribute(By.ID)
target_element_name = target.get_attribute(By.NAME)
target_element_class = target.get_attribute(By.CLASS_NAME)
target_attributes.append({target_element_label, target_element_type, target_element_id, target_element_name, target_element_class})

# Print the scraped data
import pandas as pd

df_dic = pd.DataFrame(attributes)
df_target = pd.DataFrame(target_attributes)
print(df_dic)
print(df_target)
df_dic.to_csv('out.csv', sep=',',header=headerList, index=False)
df_target.to_csv('target.csv', sep=',',header=headerList, index=False)
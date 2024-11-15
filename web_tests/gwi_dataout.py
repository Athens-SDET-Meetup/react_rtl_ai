from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def highlight(element, effect_time, color, border):
    """Highlights (blinks) a Selenium Webdriver element"""
    driver = element._parent
    def apply_style(s):
        driver.execute_script("arguments[0].setAttribute('style', arguments[1]);",
                              element, s)
    original_style = element.get_attribute('style')
    apply_style("border: {0}px solid {1};".format(border, color))
    time.sleep(effect_time)
    apply_style(original_style)

# Set up the Chrome web driver
driver = webdriver.Chrome()

# Navigate to the LinkedIn login page
driver.get('https://signin-staging.globalwebindex.com')

# Wait for the page to load
time.sleep(2)

target = driver.find_element(By.ID,'email')

# Scrape data
elements_attributes = driver.find_elements(By.TAG_NAME,'input')

attributes = []
for element in elements_attributes:
    highlight(element, 3, "blue", 5)
    if element.get_attribute(By.ID) not in [None, '']:
        element_type = element.get_attribute('data-testid')
        element_id = element.get_attribute(By.ID)
        element_name = element.get_attribute('placeholder')
        attributes.append({element_type, element_id, element_name})
        print (attributes)
# adding header 
headerList = ['element', 'id', 'name']     

target_attributes = []
target_element_type = target.get_attribute('data-testid')
target_element_id = target.get_attribute(By.ID)
target_element_name = target.get_attribute('placeholder')
target_attributes.append({target_element_type, target_element_id, target_element_name})

# Print the scraped data
import pandas as pd

#Two-dimensional, size-mutable, potentially heterogeneous tabular data.
#Data structure also contains labeled axes (rows and columns). 
#Arithmetic operations align on both row and column labels.
#Can be thought of as a dict-like container for Series objects. The primary pandas data structure.
df_dic = pd.DataFrame(attributes)
df_target = pd.DataFrame(target_attributes)
print(df_dic)
print(df_target)
df_dic.to_csv('out.csv', sep=',',header=headerList, index=False)
df_target.to_csv('target.csv', sep=',',header=headerList, index=False)

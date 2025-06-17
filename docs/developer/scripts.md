## 批量删除 pypi.org 版本

``` py linenums="1"
import time 
       
from beni import bplaywright
page = await bplaywright.testPage(url='https://pypi.org/manage/project/benimang/releases/', storageState=r'C:\Users\Administrator\Desktop\xx.dat')
        
async def myfunc():

    while True:
    
        time.sleep(3)

        # 获取版本号
        version = (await page.locator('[title="Manage version"]').last.text_content()).strip()
        
        if version.startswith('0.5.48') or version.startswith('0.6.'):
            print('exit')
            return
            
        # 点击 Options
        await page.locator('.table.table--releases .dropdown.dropdown--with-icons').last.click()
            
        # 点击 Delete
        await page.locator('.dropdown__content.display-block:visible').get_by_text('Delete').click()
            
        # 填入信息
        await page.locator("[name='confirm_delete_version']:visible").fill(version)

        # 点击删除按钮
        await page.locator(".button.button--danger.modal__action.js-confirm:visible").click()

```
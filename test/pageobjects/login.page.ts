import { $ } from '@wdio/globals'

class LoginPage {
    
    public get menuButton() { 
        return $('~open menu'); 
    }
    
    public get loginMenuOption() { 
        return $('~menu item log in'); 
    }
    
    public get inputUsername() { 

        return $('~Username input field'); 
    }
    
    public get inputPassword() { 

        return $('~Password input field'); 
    }
    
    public get btnSubmit() { 

        return $('~Login button'); 
    }

    public async login(username: string, password: string): Promise<void> {
        await this.menuButton.click();
        await this.loginMenuOption.click();
        
        await this.inputUsername.waitForDisplayed({ timeout: 5000 });
        
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
import { expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'

describe('Belo Challenge - End to End Journey', () => {
    it('Debería completar el flujo de compra de 3 unidades y cerrar sesión', async () => {
        // 1. LOGIN
        await LoginPage.login('bob@example.com', '10203040');

        // 2. SELECCIONAR PRODUCTO
        const product = await $('android=new UiSelector().text("Sauce Labs Backpack")');
        await product.waitForDisplayed({ timeout: 10000 });
        await product.click();

        // 3. AJUSTAR CANTIDAD A 3 UNIDADES
        const plusButton = await $('~counter plus button');
        await plusButton.waitForDisplayed({ timeout: 5000 });
        await plusButton.click();
        await browser.pause(500);
        await plusButton.click();

        // 4. AGREGAR UN PRODUCTO E IR AL CARRITO
        await $('~Add To Cart button').click();
        await $('~cart badge').click();

        const proceedBtn = await $('~Proceed To Checkout button');
        await proceedBtn.waitForDisplayed({ timeout: 5000 });
        await proceedBtn.click();

        // 5. COMPLETAR LOS DATOS DE ENVÍO
        await $('~Full Name* input field').setValue('Rosa E');
        await $('~Address Line 1* input field').setValue('Calle Falsa 123');
        await $('~City* input field').setValue('CABA');
        await $('~Zip Code* input field').setValue('1000');
        await $('~Country* input field').setValue('Argentina');
        await $('~To Payment button').click();

        // 6. COMPLETAR DATOS DE PAGO (Tarjeta válida)
        await $('~Full Name* input field').setValue('Rosa E');
        await $('~Card Number* input field').setValue('4242424242424242');
        await $('~Expiration Date* input field').setValue('12/28');
        await $('~Security Code* input field').setValue('123');

        if (await browser.isKeyboardShown()) {
            await browser.hideKeyboard();
        }

        const reviewOrderBtn = await $('~Review Order button');
        await reviewOrderBtn.waitForDisplayed({ timeout: 5000 });
        await reviewOrderBtn.click();

        // 7. FINALIZAR ORDEN
        const placeOrderBtn = await $('~Place Order button');
        await driver.execute('mobile: scroll', { strategy: 'accessibility id', selector: 'Place Order button', direction: 'down' });
        await placeOrderBtn.waitForDisplayed({ timeout: 10000 });
        await placeOrderBtn.click();

        // Validar compra
        const successMessage = await $('~checkout complete screen');
        await successMessage.waitForDisplayed({ timeout: 10000 });
        await expect(successMessage).toBeDisplayed();

        // 8. LOGOUT 
        await $('~open menu').click();

        const logoutOption = await $('~menu item log out');
        await logoutOption.waitForDisplayed({ timeout: 5000 });
        await logoutOption.click();

        // PRIMER MODAL LOG OUT
        const confirmLogout = await $('android=new UiSelector().text("LOG OUT")');
        await confirmLogout.waitForDisplayed({ timeout: 5000 });
        await confirmLogout.click();

        // SEGUNDO MODAL OK
        const okBtn = await $('android=new UiSelector().text("OK")');
        await okBtn.waitForDisplayed({ timeout: 5000 });
        await okBtn.click();

        // VERIFICACIÓN FINAL
        const usernameInput = await $('~Username input field');
        await usernameInput.waitForDisplayed({ timeout: 10000 });
        await expect(usernameInput).toBeDisplayed();
    });
});
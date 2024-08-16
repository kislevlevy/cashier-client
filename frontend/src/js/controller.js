'use strict';

// Imports:
import * as model from './model';
import * as auth from './auth';

import cardsView from './view/cardsView';
import navView from './view/navView';
import searchView from './view/searchView';

import editFormView from './view/form/editFormView';
import newFormView from './view/form/newFormView';
import loginForm from './view/modal/loginForm';
import registerForm from './view/modal/registerForm';
import userModal from './view/modal/userModal';
import forgotPasswordForm from './view/modal/forgotPasswordForm';
import feedbackModal from './view/modal/feedbackModal';

// Cards:
const controlRenderCards = async function () {
  try {
    if (!auth.state.currentUser)
      return editFormView.renderMessage('Plese login to start!');

    // Render Spinner while Loading:
    cardsView.rederSpinner();

    // Get data from DB:
    const data = await model.getProducts();

    // Render data to DOM in cards:
    cardsView.clearParent();
    data.map((ele) => cardsView.renderToParent(ele));

    // Error handeling:
  } catch (err) {
    console.log('⛑️', err);
    cardsView.renderMessage('Could not find any products that match your query!');
  }
};

const controlSearch = function (e) {
  e.preventDefault();

  // Get form query:
  model.state.query = searchView.getFormData();

  //Render cards:
  controlRenderCards();
};

const controlProduct = async function (e) {
  try {
    if (!auth.state.currentUser)
      return editFormView.renderMessage("You can't access this, please login.");

    // Get ID from closest perant element:
    const id = e.target.closest('.product-card')?.id.split('_') ?? [''];
    if (!id[0].includes('product')) return;

    // Render spinner
    newFormView.rederSpinner();

    // Highlight selected card:
    cardsView.highlightedCard(id[1]);

    if (id[1] === 'new') {
      newFormView.clearParent();
      newFormView.renderToParent();
    } else {
      model.state.product = await model.getProductById(id[1]);
      editFormView.clearParent();
      editFormView.renderToParent(model.state.product);
    }
    newFormView.handleEventListener(
      controlEditItem,
      controlDeleteItem,
      controlOpenFeedbackModal
    );
  } catch (err) {
    console.log('⛑️', err);
    editFormView.renderMessage('Please login to review this product.');
  }
};

const controlEditItem = async function (e) {
  try {
    e.preventDefault();

    // Assign Veriables:
    const id = e.target.id.split('-')[1];
    const { formData, isFull } = newFormView.getFormData();

    // Render spinner for loading:
    newFormView.rederSpinner();

    // New product:
    if (id === 'post') {
      if (!isFull) throw new Error('All fields are mandatory!');
      await model.postProduct(formData);
    }
    // Product patch:
    else await model.patchProductById(id, formData);

    // Refresh all cards and DB:
    editFormView.clearParent();
    model.state.isFirst = true;
    controlRenderCards();

    // Error handling:
  } catch (err) {
    console.log('⛑️', err);
    newFormView.renderMessage(
      'product was not saved/posted, ensure you check all fields before submmiting.'
    );
  }
};

const controlDeleteItem = async function (e) {
  try {
    // Role guard:
    if (auth.state.currentUser.role !== 'admin')
      alert('Only admin can delete products!');

    // Assign variables:
    console.log(e);
    const id = e.target.closest('form').id.split('-')[1];

    // Check conformation for delete:
    if (!confirm('Are you sure you want to delete this item?')) return;

    // Render Spinner:
    editFormView.rederSpinner();

    // Delete product from DB:
    await model.deleteProductById(id);

    // Refresh all cards and DB:
    editFormView.clearParent();
    model.state.isFirst = true;
    controlRenderCards();

    // Error handling:
  } catch (err) {
    console.log('⛑️', err);
    editFormView.renderMessage('Could not delete reqested item.');
  }
};

const controlOpenFeedbackModal = function () {
  feedbackModal.clearParent();
  feedbackModal.renderToParent(model.state.product);
  feedbackModal.openModal();
  feedbackModal.handleClickEventListener(controlFeedbackFormSubmit);
};

const controlFeedbackFormSubmit = async function (e) {
  try {
    // Get form data:
    e.preventDefault();
    const data = feedbackModal.getFormData();
    if (!data.rating)
      return feedbackModal.renderMessage(
        "You can't submit a feedback without rating, please try again."
      );

    // Set product id:
    data.product = e.target.id.split('-')[1];

    // Render spinner:
    feedbackModal.rederSpinner();

    // Post feedback in model:
    const res = await model.postProductFeedback(data);

    // Render to edit form:
    controlRenderCards();
    model.state.product = await model.getProductById(data.product);
    editFormView.clearParent();
    editFormView.renderToParent(model.state.product);

    // Feedback posted success message:
    feedbackModal.renderMessage(
      'Feedback was posted successfully, this window will close automatically.'
    );
    setTimeout(() => {
      feedbackModal.closeModal();
    }, 2500);

    // Error handeling
  } catch (err) {
    console.log('⛑️', err);
    feedbackModal.renderMessage(
      'The server encounterd an unexpected error while submitting your feedback, please try again.'
    );
  }
};

const controlOpenRegisterModal = function () {
  registerForm.clearParent();
  registerForm.renderToParent();
  registerForm.openModal();

  registerForm.handleClickEventListener(
    controlOpenLoginModal,
    controlSubmitRegister
  );
};

const controlSubmitForgotPassword = async function (e) {
  try {
    e.preventDefault();
    forgotPasswordForm.rederSpinner();

    const formData = forgotPasswordForm.getFormData();
    await auth.forgot(formData);

    forgotPasswordForm.generateMarkupAfter();

    forgotPasswordForm.handleClickEventListener(
      controlOpenLoginModal,
      controlSubmitResetPassword
    );
  } catch (err) {
    forgotPasswordForm.renderMessage('Could not reset password, try again later.');

    console.log('⛑️', err);
  }
};

const controlSubmitResetPassword = async function (e) {
  try {
    e.preventDefault();
    forgotPasswordForm.rederSpinner();

    const { token, password, passwordConfirm } =
      forgotPasswordForm.getFormDataAfter();

    await auth.reset(token, { password, passwordConfirm });

    forgotPasswordForm.renderMessage(
      'Password has been reset successfully, you may login now.'
    );

    setTimeout(() => {
      loginForm.clearParent();
      loginForm.renderToParent();

      loginForm.handleClickEventListener(
        controlOpenRegisterModal,
        controlSubmitLogin,
        controlOpenForgotForm
      );
    }, 2500);

    // Error handling:
  } catch (err) {
    forgotPasswordForm.renderMessage('Could not reset password, try again later.');

    console.log('⛑️', err);
  }
};

const controlOpenForgotForm = function () {
  forgotPasswordForm.clearParent();
  forgotPasswordForm.renderToParent();
  forgotPasswordForm.openModal();

  forgotPasswordForm.handleClickEventListener(
    controlOpenLoginModal,
    controlSubmitForgotPassword
  );
};

const controlOpenLoginModal = function () {
  if (!auth.state.currentUser) {
    loginForm.clearParent();
    loginForm.renderToParent();
    loginForm.openModal();

    loginForm.handleClickEventListener(
      controlOpenRegisterModal,
      controlSubmitLogin,
      controlOpenForgotForm
    );
  } else {
    userModal.clearParent();
    userModal.renderToParent(auth.state.currentUser);
    userModal.handleEventListener(controlLogout);
    userModal.openModal();
  }
};

const controlCloseModal = function () {
  loginForm.closeModal();
};

const controlSubmitLogin = async function (e) {
  try {
    e.preventDefault();
    loginForm.rederSpinner();

    const formData = loginForm.getFormData();
    const { user } = await auth.login(formData);
    auth.state.currentUser = user;

    navView.changeButtonInnerHtml(auth.state.currentUser.name);
    userModal.clearParent();
    userModal.renderToParent(auth.state.currentUser);
    userModal.handleEventListener(controlLogout);

    controlRenderCards();
  } catch (err) {
    loginForm.renderMessage('Could not login, email or password is incorrect');

    console.log('⛑️', err);
  }
};

const controlSubmitRegister = async function (e) {
  try {
    e.preventDefault();
    registerForm.rederSpinner();

    const formData = registerForm.getFormData();
    await auth.register(formData);
    registerForm.renderMessage(
      'User was successfully registered! You can now login.'
    );
  } catch (err) {
    registerForm.renderMessage('Could not register, check all fields again');
    console.log('⛑️', err);
  }
};

const controlLogout = async function (e) {
  if (e) e.preventDefault();

  // document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  await auth.logout();

  auth.state.currentUser = '';
  navView.changeButtonInnerHtml();
  editFormView.clearParent();
  userModal.closeModal();
  cardsView.clearParent();
};

const init = function () {
  if (document.cookie) controlLogout();

  cardsView.handleEventListener(controlProduct);
  searchView.handleEventListener(controlSearch);
  navView.handleEventListener(controlOpenLoginModal);
  loginForm.handleEventListener(controlCloseModal);
};
init();

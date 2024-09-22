import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});
  const [validationState, setValidationState] = useState({email: false, password: false});

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password: e.target.value})
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    // Validar el correo al hacer submit y cambiar el estado del password
    setValidationState({...validationState, email: validateEmail(), password: validatePassword()});
    console.log(formValues);
    console.log("Email: ", validateEmail(), "Password: ", validatePassword());
  })

  // El correo se valida empleando expresiones regulares para verificar que tenga un @ y un dominio
  const validateEmail = () => {return formValues.email.includes('@') && formValues.email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)};
  // La contraseña debe tener al menos 9 caracteres y se valida con expresiones regulares
  const validatePassword = () => {return formValues.password.length >= 9 && /^(?=.*[a-zA-Z])(?=.*\d)/.test(formValues.password)};

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} isValid={validationState.email} isInvalid={!validationState.email}/>
        { !validationState.email && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isValid={validatePassword()} isInvalid={!validatePassword()}/>
        { !validatePassword() && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
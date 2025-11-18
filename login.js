
/*
  Uso: copia este bloque a scripts/login.js
  - Maneja validación básica, toggle de contraseña y un mock de petición.
  - Sustituye la función `mockServerLogin` por tu llamada `fetch` a tu endpoint real.
*/

(() => {
  const form = document.getElementById('loginForm');
  const userInput = document.getElementById('user');
  const passInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePassword');
  const submitBtn = document.getElementById('submitBtn');
  const userError = document.getElementById('userError');
  const passError = document.getElementById('passwordError');
  const formMessage = document.getElementById('formMessage');

  function resetErrors(){
    userError.textContent = '';
    passError.textContent = '';
    formMessage.textContent = '';
  }

  function validate(){
    let ok = true;
    resetErrors();

    const user = userInput.value.trim();
    const pass = passInput.value;

    if(!user){
      userError.textContent = 'Introduce tu correo o usuario.';
      ok = false;
    } else if (user.length < 3){
      userError.textContent = 'Usuario demasiado corto.';
      ok = false;
    }

    if(!pass){
      passError.textContent = 'Introduce la contraseña.';
      ok = false;
    } else if (pass.length < 6){
      passError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      ok = false;
    }

    return ok;
  }

  toggleBtn.addEventListener('click', () => {
    const type = passInput.type === 'password' ? 'text' : 'password';
    passInput.type = type;
    toggleBtn.setAttribute('aria-label', type === 'text' ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;

    if(!validate()){
      submitBtn.disabled = false;
      return;
    }

    const payload = {
      user: userInput.value.trim(),
      password: passInput.value,
      remember: document.getElementById('remember').checked
    };

    // Aquí debes sustituir mockServerLogin por tu fetch a la API real.
    try{
      formMessage.textContent = 'Iniciando sesión...';
      const res = await fetch(payload);

      if(res.ok){
        formMessage.textContent = '¡Bienvenido! Redirigiendo...';
        // ejemplo de redirección tras login exitoso
        setTimeout(() => {
          window.location.href = res.redirect || '/dashboard.html';
        }, 700);
      } else {
        formMessage.textContent = res.message || 'Credenciales incorrectas.';
        submitBtn.disabled = false;
      }
    } catch (err){
      console.error(err);
      formMessage.textContent = 'Error de conexión. Intenta nuevamente.';
      submitBtn.disabled = false;
    }
  });

  // Mock de servidor para demo. Reemplaza por fetch POST real.
  async function mockServerLogin(payload){
    // simulación de respuesta asíncrona
    await new Promise(r => setTimeout(r, 600));

    // Usuario de ejemplo: user: "cliente", password: "gimnasio123"
    if((payload.user === 'cliente' || payload.user === 'cliente@gym.com') && payload.password === 'gimnasio123'){
      return { ok: true, redirect: '/inicio.html' };
    }

    return { ok: false, message: 'Usuario o contraseña incorrectos.' };
  }

})();

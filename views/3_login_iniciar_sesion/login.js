document.addEventListener('DOMContentLoaded', function () {
    const loginFormulario = document.getElementById('formulario');

    loginFormulario.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email-input').value.trim();
        const password = document.getElementById('password-input').value.trim();

        if (!email || !password) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post('/api/users/login', { email, password });

            if (response.data.valido) {
                const rol = response.data.rol;
                switch (rol) {
                    case 'admin':
                        window.location.href = '/admin/';
                        break;
                    case 'user':
                        window.location.href = '/vistaUsuarioEmpleado/';
                        break;
                    default:
                        alert('El rol no se reconoce');
                }
            } else {
                alert('Credenciales incorrectas REVISA.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema REVISA');
        }
    });
});

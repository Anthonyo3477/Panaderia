using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace ProyectoPanaderia.Pages
{
    public class Login_RegistrarModel : PageModel
    {
        // Simulación de base de datos en memoria (debe migrarse a una DB real)
        private static readonly Dictionary<string, (string Password, string Rol)> usuarios = new()
        {
            { "admin@panaderia.com", ("admin123", "admin") },
            { "cliente@panaderia.com", ("cliente123", "cliente") }
        };

        [BindProperty]
        public string? LoginEmail { get; set; }
        [BindProperty]
        public string? LoginPassword { get; set; }
        [BindProperty]
        public string? RegisterName { get; set; }
        [BindProperty]
        public string? RegisterEmail { get; set; }
        [BindProperty]
        public string? RegisterPassword { get; set; }

        public string? ErrorMessage { get; set; }

        public void OnGet()
        {
        }

        // 🔹 Procesar Login
        public IActionResult OnPostLogin()
        {
            if (string.IsNullOrEmpty(LoginEmail) || string.IsNullOrEmpty(LoginPassword))
            {
                ErrorMessage = "Debe ingresar correo y contraseña.";
                return Page();
            }

            if (usuarios.TryGetValue(LoginEmail, out var usuario) && usuario.Password == LoginPassword)
            {
                HttpContext.Session.SetString("UserEmail", LoginEmail);
                HttpContext.Session.SetString("UserRole", usuario.Rol);

                // Redirige a la página correcta según el rol
                return Redirect(usuario.Rol == "admin" ? "/hom  eAdmin" : "/Index");
            }

            ErrorMessage = "Correo o contraseña incorrectos.";
            return Page();
        }


        // 🔹 Procesar Registro
        public IActionResult OnPostRegister()
        {
            if (string.IsNullOrEmpty(RegisterEmail) || string.IsNullOrEmpty(RegisterPassword))
            {
                ErrorMessage = "Debe ingresar un correo y una contraseña.";
                return Page();
            }

            if (usuarios.ContainsKey(RegisterEmail))
            {
                ErrorMessage = "El correo ya está registrado.";
                return Page();
            }

            // Simulación de registro (en un sistema real, esto iría a una base de datos)
            usuarios[RegisterEmail] = (RegisterPassword, "cliente");
            return RedirectToPage("/Login_Registrar");
        }

        // 🔹 Cerrar sesión
        public IActionResult OnGetLogout()
        {
            HttpContext.Session.Clear();
            return RedirectToPage("/Index");
        }
    }
}
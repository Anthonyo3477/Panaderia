namespace ProyectoPanaderia.wwwroot.Modelos
{
    public class Cliente
    {

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public string Telefono { get; set; }
        public string Direccion {  get; set; }

        public ICollection<Pedido> Pedidos { get; set; }

    }
}

namespace ProyectoPanaderia.wwwroot.Modelos
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Clasificacion { get; set; }
        public string Descripcion { get; set; }
        public string ImagenUrl { get; set; }

        public Pan pan { get; set; }
        public Pasteleria pasteleria { get; set; }

        public ICollection<PedidoDetalle> PedidoDetalles { get; set; }

    }
}

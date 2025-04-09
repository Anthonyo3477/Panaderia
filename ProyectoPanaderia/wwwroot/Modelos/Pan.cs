namespace ProyectoPanaderia.wwwroot.Modelos
{
    public class Pan
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public decimal Peso { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }

        public Producto Producto { get; set; }
    }
}

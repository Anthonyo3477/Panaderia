namespace ProyectoPanaderia.wwwroot.baseDataHelper
{
    public class DataBaseHelper
    {
        private readonly string _connectionString;

        public DataBaseHelper( IConfiguration configuracion )
        {
            _connectionString = configuracion.GetConnectionString("DefaultConnection");
        }

        public async Task InsertAdmin()
        {

        }
    }
}

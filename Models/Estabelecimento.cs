using System.ComponentModel.DataAnnotations;

namespace EstabelecimentosAPI.Models
{
    public class Estabelecimento
    {
        public int Id { get; set; }

        [Required]
        public string RazaoSocial { get; set; }

        public string NomeFantasia { get; set; }

        [Required]
        [RegularExpression(@"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$", ErrorMessage = "CNPJ inválido.")]
        public string Cnpj { get; set; }

        public string Email { get; set; }

        public string Endereco { get; set; }

        public string Cidade { get; set; }

        public string Estado { get; set; }

        public string Telefone { get; set; }

        [Required]
        public DateTime DataCadastro { get; set; }

        public Categoria Categoria { get; set; }

        public Status Status { get; set; }

        [RegularExpression(@"^\d{3}-\d$", ErrorMessage = "Agência inválida.")]
        public string Agencia { get; set; }

        [RegularExpression(@"^\d{2}\.\d{3}-\d$", ErrorMessage = "Conta inválida.")]
        public string Conta { get; set; }
    }
      
}

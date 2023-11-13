-- Remover restrições temporariamente
SET CONSTRAINTS ALL DEFERRED;

-- -----------------------------------------------------
-- Schema tanamao
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS tanamao;

-- -----------------------------------------------------
-- Table tanamao.Endereco
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.Endereco (
  idEndereco SERIAL PRIMARY KEY,
  Logadouro VARCHAR(80) NOT NULL,
  Numero INT NOT NULL,
  Complemento VARCHAR(45),
  Cidade VARCHAR(45) NOT NULL,
  Estado VARCHAR(45) NOT NULL,
  CEP VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table tanamao.ExperienciaProfissional
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.ExperienciaProfissional (
  idExperienciaProfissional SERIAL PRIMARY KEY,
  Funcao VARCHAR(45) NOT NULL,
  DescricaoDaFuncao VARCHAR(100)
);

-- -----------------------------------------------------
-- Table tanamao.Cliente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.Cliente (
  idCliente SERIAL PRIMARY KEY,
  Nome VARCHAR(100) NOT NULL,
  DataDeNascimento DATE NOT NULL,
  Email VARCHAR(45) NOT NULL,
  Telefone VARCHAR(45) NOT NULL,
  idEndereco INT NOT NULL,
  CPF VARCHAR(11) NOT NULL,
  FormacaoAcademica VARCHAR(45) NOT NULL,
  Qualificacoes VARCHAR(45) NOT NULL,
  idExperienciaProfissional INT,
  Servico_Oferecido VARCHAR(45) NOT NULL,
  FOREIGN KEY (idEndereco) REFERENCES tanamao.Endereco(idEndereco) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idExperienciaProfissional) REFERENCES tanamao.ExperienciaProfissional(idExperienciaProfissional) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table tanamao.EnderecoContratante
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.EnderecoContratante (
  idEnderecoContratante SERIAL PRIMARY KEY,
  Logadouro VARCHAR(80) NOT NULL,
  Numero INT NOT NULL,
  Complemento VARCHAR(45),
  Cidade VARCHAR(45) NOT NULL,
  Estado VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table tanamao.VagaOfertada
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.VagaOfertada (
  idVagaOfertada SERIAL PRIMARY KEY,
  TipoDeVaga VARCHAR(45),
  VagaOfertadacol VARCHAR(45),
  TipoVaga VARCHAR(45) CHECK (TipoVaga IN ('FREELANCE', 'ESTAGIO', 'CLT')) NOT NULL,
  OfertaSalrial VARCHAR(45),
  DescricaoVaga VARCHAR(200),
  Requisitos VARCHAR(200)
);

-- -----------------------------------------------------
-- Table tanamao.Contratante
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.Contratante (
  idContratante SERIAL PRIMARY KEY,
  Nome VARCHAR(100) NOT NULL,
  Email VARCHAR(45) NOT NULL,
  Telefone VARCHAR(45) NOT NULL,
  CPF_CNPJ VARCHAR(45) NOT NULL,
  RamoAtividade VARCHAR(80),
  idEnderecoContratante INT NOT NULL,
  VagaOfertada_idVagaOfertada INT NOT NULL,
  FOREIGN KEY (idEnderecoContratante) REFERENCES tanamao.EnderecoContratante(idEnderecoContratante) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (VagaOfertada_idVagaOfertada) REFERENCES tanamao.VagaOfertada(idVagaOfertada) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table tanamao.VagadeInteresse
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tanamao.VagadeInteresse (
  idVagadeInteresse SERIAL PRIMARY KEY,
  idCliente INT NOT NULL,
  idVagaOfertada INT NOT NULL,
  idContratante INT NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES tanamao.Cliente(idCliente) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idVagaOfertada) REFERENCES tanamao.VagaOfertada(idVagaOfertada) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (idContratante) REFERENCES tanamao.Contratante(idContratante) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Restaurar restrições
SET CONSTRAINTS ALL IMMEDIATE;

-- Restaurar restrições
SET CONSTRAINTS ALL IMMEDIATE;
-- Restaurar configurações originais
SET SQL_MODE = @OLD_SQL_MODE;

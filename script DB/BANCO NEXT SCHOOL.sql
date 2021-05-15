SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `next-school` DEFAULT CHARACTER SET utf8 ;
USE `next-school` ;


CREATE TABLE IF NOT EXISTS `next-school`.`alunos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `cpf` VARCHAR(11) NOT NULL UNIQUE,
  `img_perfil` VARCHAR(300) NULL DEFAULT NULL,
  `modulo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    CONSTRAINT `fk_aluno_modulo`
    FOREIGN KEY (`modulo_id`)
    REFERENCES `next-school`.`modulos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `next-school`.`modulos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `next-school`.`disciplinas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `modulo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_disciplina_modulo`
    FOREIGN KEY (`modulo_id`)
    REFERENCES `next-school`.`modulos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `next-school`.`professores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `senha_professor` CHAR(8) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL UNIQUE,
  `img_perfil` VARCHAR(200) NULL DEFAULT NULL,
  `modulo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_professores_modulos1`
    FOREIGN KEY (`modulo_id`)
    REFERENCES `next-school`.`modulos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `next-school`.`alunos_disciplina` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `aluno_id` INT NOT NULL,
  `disciplina_id` INT NOT NULL,
  `nota` Double,
  `createdAt` DATETIME NULL DEFAULT now(),
  `updatedAt` DATETIME NULL DEFAULT now(),
  CONSTRAINT `fk_aluno_disciplina_aluno_id` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`),
  CONSTRAINT `fk_aluno_disciplina_disciplina_id` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) 
) ;

CREATE TABLE IF NOT EXISTS `next-school`.`adm` (
  `codigo` varchar(8) NOT NULL PRIMARY KEY,
  `senha` char(8) NOT NULL
) ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `next-school`.`adm` (`codigo`,`senha`) VALUES ('N2E3X4T@','12345678');

INSERT INTO `next-school`.`modulos` (`nome`) VALUES ('FRONT-END');
INSERT INTO `next-school`.`modulos` (`nome`) VALUES ('BACK-END');
INSERT INTO `next-school`.`modulos` (`nome`) VALUES ('BANCO DE DADOS');

INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('CSS', '1');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('HTML', '1');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('JAVASCRIPT', '1');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('RUBY', '2');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('PYTHON', '2');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('JAVA', '2');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('MYSQL', '3');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('POSTGRE', '3');
INSERT INTO `next-school`.`disciplinas` (`nome`, `modulo_id`) VALUES ('ORACLE', '3');

INSERT INTO `next-school`.`professores` (`nome`, `senha_professor`, `cpf`, `modulo_id`) VALUES ('Talita', '12345678', '64185296386', '1');
INSERT INTO `next-school`.`professores` (`nome`, `senha_professor`, `cpf`, `modulo_id`) VALUES ('Bruno', '12345678', '75395185245', '2');
INSERT INTO `next-school`.`professores` (`nome`, `senha_professor`, `cpf`, `modulo_id`) VALUES ('Iago', '12345678', '45129638785', '3');

INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('joão', '12345678901', '1');
INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('diego', '23456789012', '1');
INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('rafael', '34567890123', '2');
INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('anderson', '45678901234', '2');
INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('rebeka', '56789012345', '3');
INSERT INTO `next-school`.`alunos` (`nome`, `cpf`, `modulo_id`) VALUES ('henrique', '67890123456', '3');

INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('1', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('1', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('1', '3');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('2', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('2', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('2', '3');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('3', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('3', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('3', '3');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('4', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('4', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('4', '3');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('5', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('5', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('5', '3');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('6', '1');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('6', '2');
INSERT INTO `next-school`.`alunos_disciplina` (`aluno_id`, `disciplina_id`) VALUES ('6', '3');

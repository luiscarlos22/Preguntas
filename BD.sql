CREATE DATABASE db_preguntas;

USE db_preguntas;

CREATE TABLE `preguntas` (
  `IdPregunta` int(11) NOT NULL,
  `Pregunta` varchar(500) NOT NULL,
  `Categoria` varchar(50) NOT NULL,
  `CantidadPreguntada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `respuestas` (
  `IdOpcion` int(11) NOT NULL,
  `Enunciado` text NOT NULL,
  `IdPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`IdPregunta`);

ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`IdOpcion`);

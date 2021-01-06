const MySQL = require('../mysql/mysql');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint con POST que permita agregar opciones de pregunta con opciones de respuesta
app.post('/agregar', (req, res) => {
    let body = req.body;
    let idpregunta = body.idpregunta;
    let pregunta = body.pregunta;
    let categoria = body.categoria;
    let respuesta = body.respuesta;
    let idopc1 = respuesta.Opcion1.Idopc;
    let enunciado1 = respuesta.Opcion1.Enunciado;
    let idopc2 = respuesta.Opcion2.Idopc;
    let enunciado2 = respuesta.Opcion2.Enunciado;

    if (idpregunta == null) {
        res.json({
            ok: false,
            message: 'Falta el campo idpregunta'
        })
    }
    if (pregunta == null) {
        res.json({
            ok: false,
            message: 'Falta el campo pregunta'
        })
    }
    if (categoria == null) {
        res.json({
            ok: false,
            message: 'Falta el campo categoria'
        })
    }
    if (respuesta == null) {
        res.json({
            ok: false,
            message: 'Faltan respuestas'
        })
    }

    let query = "SELECT * FROM preguntas WHERE IdPregunta=" + idpregunta + ";";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        if (result.length !== 0) {
            res.json({
                ok: false,
                message: "El IdPregunta " + idpregunta + " ya existe"
            });
        } else {
            query = "SELECT * FROM respuestas WHERE IdOpcion=" + idopc1 + ";";
            MySQL.ejecutarQuery(query, (err, result) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        error: err
                    });
                }
                if (result.length !== 0) {
                    res.json({
                        ok: false,
                        message: "El idopc " + idopc1 + " ya existe"
                    });
                } else {
                    query = "SELECT * FROM respuestas WHERE IdOpcion=" + idopc2 + ";";
                    MySQL.ejecutarQuery(query, (err, result) => {
                        if (err) {
                            res.status(400).json({
                                ok: false,
                                error: err
                            });
                        }
                        if (result.length !== 0) {
                            res.json({
                                ok: false,
                                message: "El idopc " + idopc2 + " ya existe"
                            });
                        } else {
                            query = "INSERT INTO preguntas (IdPregunta, Pregunta, Categoria, CantidadPreguntada) VALUES (" + idpregunta + ", '" + pregunta + "', '" + categoria + "', 0);";
                            MySQL.ejecutarQuery(query, (err, result) => {
                                if (err) {
                                    res.status(400).json({
                                        ok: false,
                                        error: err
                                    });
                                }
                                query = "INSERT INTO respuestas (IdOpcion, Enunciado, IdPregunta) VALUES (" + idopc1 + ", '" + enunciado1 + "', '" + idpregunta + "');";
                                MySQL.ejecutarQuery(query, (err, result) => {
                                    if (err) {
                                        res.status(400).json({
                                            ok: false,
                                            error: err
                                        });
                                    }
                                    query = "INSERT INTO respuestas (IdOpcion, Enunciado, IdPregunta) VALUES (" + idopc2 + ", '" + enunciado2 + "', '" + idpregunta + "');";
                                    MySQL.ejecutarQuery(query, (err, result) => {
                                        if (err) {
                                            res.status(400).json({
                                                ok: false,
                                                error: err
                                            });
                                        }
                                        res.json({
                                            ok: true,
                                            mensagge: "Se a guardado con exito"
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }
    });
});

// Endpoint que traiga los enunciados pasandole el idopc
app.get('/enunciado/:idopc', (req, res) => {
    let idopc = req.params.idopc;

    let query = "SELECT * FROM respuestas WHERE IdOpcion=" + idopc + ";";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            if (result.length === 0) {
                res.json({
                    ok: false,
                    message: "El rejistro solicitado no existe"
                });
            } else {
                res.json({
                    ok: true,
                    enunciado: result[0].Enunciado
                })
            }
        }
    });
});

//Endpoint que traiga las respuestas posibles pasandole el idpregunta
app.get('/respuestas/:idpregunta', (req, res) => {
    let idpregunta = req.params.idpregunta;
    let query = "SELECT * FROM respuestas WHERE IdPregunta=" + idpregunta + ";";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            if (result.length === 0) {
                res.json({
                    ok: false,
                    message: "El rejistro solicitado no existe"
                });
            } else {
                res.json({
                    ok: true,
                    result
                });
            }
        }
    });
});

// Endpoint con UPDATE que permita editar una preguntas y respuestas
app.put('/editarpreguntas', (req, res) => {
    let body = req.body;
    let idpregunta = body.idpregunta;
    let pregunta = body.pregunta;
    let categoria = body.categoria;
    let cantidad = body.cantidad;
    let respuesta = body.respuesta;
    let idopc1 = respuesta.Opcion1.Idopc;
    let enunciado1 = respuesta.Opcion1.Enunciado;
    let idopc2 = respuesta.Opcion2.Idopc;
    let enunciado2 = respuesta.Opcion2.Enunciado;

    if (idpregunta == null) {
        res.json({
            ok: false,
            message: 'Falta el campo idpregunta'
        })
    }
    if (pregunta == null) {
        res.json({
            ok: false,
            message: 'Falta el campo pregunta'
        })
    }
    if (categoria == null) {
        res.json({
            ok: false,
            message: 'Falta el campo categoria'
        })
    }
    if (cantidad == null) {
        res.json({
            ok: false,
            message: 'Falta el campo cantidad de veces preguntada'
        })
    }
    if (respuesta == null) {
        res.json({
            ok: false,
            message: 'Faltan respuestas'
        })
    }
    let query = "UPDATE preguntas SET Pregunta='" + pregunta + "', Categoria='" + categoria + "', CantidadPreguntada='" + cantidad + "' WHERE IdPregunta=" + idpregunta + ";";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        query = "UPDATE respuestas SET Enunciado='" + enunciado1 + "' WHERE IdOpcion=" + idopc1 + ";";
        MySQL.ejecutarQuery(query, (err, result) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            query = "UPDATE respuestas SET Enunciado='" + enunciado2 + "' WHERE IdOpcion=" + idopc2 + ";";
            MySQL.ejecutarQuery(query, (err, result) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        error: err
                    });
                }
                res.json({
                    ok: true,
                    mensagge: "Se a actualizado con exito"
                });
            });
        });

    });
});

//Endpoint que permita consultar todas las preguntas y respuestas con sus respectivos ids pasándole una categoría
app.get('/porcategoria/:categoria', (req, res) => {
    let categoria = req.params.categoria;
    let query = "SELECT p.IdPregunta, p.Pregunta, r.IdOpcion, r.Enunciado FROM preguntas p, respuestas r WHERE p.Categoria='" + categoria + "' AND r.IdPregunta=p.IdPregunta";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            if (result.length === 0) {
                res.json({
                    ok: false,
                    message: "El rejistro solicitado no existe"
                });
            } else {
                let json = {};
                let preguntas = [];
                let condicion = true;
                n = 0;
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    if (condicion) {
                        json = {
                            idpregunta: element.IdPregunta,
                            pregunta: element.Pregunta,
                            respuesta: {
                                Opcion1: {
                                    Idopc: element.IdOpcion,
                                    Enunciado: element.Enunciado
                                },
                                Opcion2: {
                                    Idopc: "",
                                    Enunciado: ""
                                }
                            }
                        };
                        condicion = false;
                    } else {
                        json.respuesta.Opcion2.Idopc = element.IdOpcion
                        json.respuesta.Opcion2.Enunciado = element.Enunciado
                        preguntas[n] = json;
                        n++;
                        condicion = true;
                    }
                }
                res.json({
                    ok: true,
                    preguntas
                });
            }
        }
    });
});

//Endpoint que traiga cuantas preguntas se han hecho por cada categoría
app.post('/cantidadcategorias', (req, res) => {
    let categoria = req.params.categoria;
    let query = "SELECT p.Categoria, COUNT(p.Categoria) As Cantidad FROM preguntas p GROUP BY p.Categoria;";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            if (result.length === 0) {
                res.json({
                    ok: false,
                    message: "El rejistro solicitado no existe"
                });
            } else {
                res.json({
                    ok: true,
                    result
                });
            }
        }
    });
});

//Endpoint que devuelva todas las preguntas y respuestas con el número de veces que han sido preguntadas
app.post('/cantidadpreguntada', (req, res) => {
    let query = "SELECT p.IdPregunta, p.CantidadPreguntada, p.Categoria, p.Pregunta, r.IdOpcion, r.Enunciado FROM preguntas p, respuestas r WHERE r.IdPregunta=p.IdPregunta";
    MySQL.ejecutarQuery(query, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            if (result.length === 0) {
                res.json({
                    ok: false,
                    message: "El rejistro solicitado no existe"
                });
            } else {
                let json = {};
                let preguntas = [];
                let condicion = true;
                n = 0;
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    if (condicion) {
                        json = {
                            idpregunta: element.IdPregunta,
                            pregunta: element.Pregunta,
                            categoria: element.Categoria,
                            CantidadPreguntada: element.CantidadPreguntada,
                            respuesta: {
                                Opcion1: {
                                    Idopc: element.IdOpcion,
                                    Enunciado: element.Enunciado
                                },
                                Opcion2: {
                                    Idopc: "",
                                    Enunciado: ""
                                }
                            }
                        };
                        condicion = false;
                    } else {
                        json.respuesta.Opcion2.Idopc = element.IdOpcion
                        json.respuesta.Opcion2.Enunciado = element.Enunciado
                        preguntas[n] = json;
                        n++;
                        condicion = true;
                    }
                }
                res.json({
                    ok: true,
                    preguntas
                });
            }
        }
    });
});


module.exports = app;
import React, { useState, useEffect } from 'react'

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container'

import { Form, SubmitButton, List } from './styles'

function Main() {
    const [newRepo, setNewRepo] = useState('')
    const [repositorio, setRepositorio] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const repos = localStorage.getItem('repositorios')
        setRepositorio(JSON.parse(repos))

    }, []);

    useEffect(() => {
        localStorage.setItem('repositorios', JSON.stringify(repositorio))
    }, [repositorio]);

    const handleInputChange = e => {
        setNewRepo(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true)

        const response = await api.get(`/repos/${newRepo}`)
        const data = {
            name: response.data.full_name,
        }


        setRepositorio([...repositorio, data])
        setNewRepo('')
        setLoading(false)
    }
    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? <FaSpinner color="#fff" /> : <FaPlus color="#fff" size={14} />}

                </SubmitButton>
            </Form>
            <List>
                {repositorio.map(reposi => (
                    <li key={reposi.name}>
                        <span>{reposi.name}</span>
                        <Link to={`/repository/${encodeURIComponent(reposi.name)}`}>Detalhes</Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}

export default Main


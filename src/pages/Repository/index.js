import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import { Loading } from './styles'

import Container from '../../components/Container'

import api from '../../services/api'

function Repository({ match }) {
    const [repo, setRepo] = useState({})
    const [issue, setIssue] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchApi() {
        const repoName = decodeURIComponent(match.params.repository)

        const [repositorios, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5
                }
            })
        ])

        setRepo(repositorios.data)
        setIssue(issues.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchApi();
    }, [])

    if (loading) {
        return <Loading>Carregando</Loading>
    }

    return <Container>retornou</Container>
}

export default Repository


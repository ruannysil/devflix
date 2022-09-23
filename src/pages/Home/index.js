import { useEffect, useState } from 'react';
import api from "../../services/api";
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            const response = await api.get( "movie/popular", {
                params: {
                    api_key: "75eddc206ffda5dd327101183d4e6b2f",
                    language: "pt-BR",
                    page: 1,
                }
            })


            setFilmes(response.data.results.slice(0, 20))
            setLoading(false);
        }

        loadFilme();

    }, [])

    if(loading) {
        return (
            <div className='loading'>
                <h2>Carregando filme...</h2>
            </div>
        )
    }

    return(
        <div className="conatiner">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
import {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../services/api";
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "75eddc206ffda5dd327101183d4e6b2f",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() =>{
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
           
        }

    }, [navigate, id])

    function salvarFilme() {
       const minhaLista = localStorage.getItem("@devflix");
       
       let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilmes) {
            toast.warn('Esse filme já esta na sua lista!')
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@devflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
        
            <div className="area-buttons">
                <button className="btn-green" onClick={salvarFilme}>
                    Salvar
                </button>
                <button>
                    <a target="black" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
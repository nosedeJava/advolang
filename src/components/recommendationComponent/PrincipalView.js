import React from 'react';
import ListRecommendationService from "../../services/ListRecommendationService"
import FilterSection from "./FilterSection"
import './PrincipalView.css';

export default function PrincipalView(props) {
    const [viewType, setViewType] = React.useState(props.type);
    const [lang, setLang] = React.useState('none');
    const [title, setTitle] = React.useState('');
    const [difficulty, setDifficulty] = React.useState('');
    const [categories, setCategories] = React.useState([]);

    const changeViewType = (newType) => {
        setViewType(newType)
    }
    const changeLang = (newLang) => {
        setLang(newLang)
    }
    const changeTofilterView = (title, difficulty, categories) => {
        setTitle(title);
        setDifficulty(difficulty);
        setCategories(categories);
        changeViewType("filtered");
    }
    const FilterView = () => {
        return <ListRecommendationService filtered title={title} difficulty={difficulty} categories={categories} />
    }
    return (
        <div className="mainDiv" >
            {viewType === "lang" && <h1>{lang}</h1>}
            <FilterSection renderFilterFunction={changeTofilterView} lang={lang}/>
            {viewType === "main" && <ListRecommendationService main />}
            {viewType === "saved" && <ListRecommendationService saved />}
            {viewType === "reported" && <ListRecommendationService reported />}
            {viewType === "self" && <ListRecommendationService self />}
            {viewType === "filtered" && FilterView()}
            {viewType === "lang" && <ListRecommendationService lang={lang} />}
        </div>
    );
}
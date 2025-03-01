import React from 'react';
import InfoCours from './infoCours';

const InfoClassiqueDance = () => {
    const contentClassical = {
        content: (
            <div>
                <h2>Qu'est-ce que la Danse Classique ?</h2>
                <hr></hr>
                <p>La danse classique, également connue sous le nom de ballet, est une forme de danse qui trouve ses origines à la cour de la Renaissance en Italie et en France. Elle se caractérise par des mouvements gracieux, une technique rigoureuse et une expression artistique élégante. La danse classique inclut des techniques comme les pointes, les pirouettes et les sauts, et elle est souvent accompagnée de musique classique.</p>

                <h3>Nos Cours et Ateliers</h3>
                <p>Nous proposons une variété de cours adaptés à tous les niveaux :</p>
                <ul>
                    <li>Cours Débutants : Pour ceux qui découvrent la danse classique, ces cours introduisent les bases techniques et encouragent l'exploration personnelle.</li>
                    <li>Cours Intermédiaires : Pour les danseurs ayant déjà une certaine expérience, ces cours visent à affiner les compétences techniques et à développer l'expression individuelle.</li>
                    <li>Cours Avancés : Destinés aux danseurs expérimentés, ces cours offrent un défi technique et artistique pour pousser les limites de votre danse.</li>
                    <li>Ateliers Spéciaux : Nous organisons régulièrement des ateliers avec des chorégraphes invités pour offrir des perspectives nouvelles et des techniques innovantes.</li>
                </ul>

                <h3>Nos Événements</h3>
                <p>L'association organise également divers événements tout au long de l'année :</p>
                <ul>
                    <li>Spectacles de Fin d'Année : Une occasion pour tous nos membres de présenter le fruit de leur travail devant un public.</li>
                    <li>Stages Intensifs : Des sessions intensives pour approfondir une technique particulière ou découvrir un nouveau style de danse.</li>
                    <li>Rencontres et Échanges : Des événements pour échanger avec d'autres danseurs et professionnels de la danse.</li>
                </ul>

                <h3>Pourquoi Nous Rejoindre ?</h3>
                <p>Rejoindre notre association, c'est intégrer une communauté passionnée et dynamique. Nous offrons :</p>
                <ul>
                    <li>Un Environnement Accueillant : Nos cours sont ouverts à tous, sans discrimination d'âge, de niveau ou d'expérience.</li>
                    <li>Des Professeurs Qualifiés : Notre équipe est composée de danseurs professionnels et de chorégraphes expérimentés, prêts à partager leur savoir-faire et leur passion.</li>
                    <li>Une Opportunité de Créativité : La danse classique est un art en constante évolution, et nous encourageons chacun à exprimer sa propre créativité.</li>
                </ul>

                <h3>Contactez-Nous</h3>
                <p>Pour en savoir plus sur nos cours, événements et inscriptions, n'hésitez pas à nous contacter :</p>
                <p>Adresse : 123 Rue de la Danse, 75000 Paris</p>
                <p>Téléphone : 01 23 45 67 89</p>
               
            </div>
        )
    };

    return (
        <div>
            <InfoCours
                title="Danse Classique"
                content={contentClassical.content}
                image="https://th.bing.com/th/id/R.9e51b6de6ba2706a47e90ad2d1dece24?rik=6UebFvcPX%2fQqwQ&pid=ImgRaw&r=0" // Remplacez par une URL valide de votre choix
            ></InfoCours>
        </div>
    );
};

export default InfoClassiqueDance;

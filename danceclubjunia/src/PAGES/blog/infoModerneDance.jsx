import React from 'react';
import InfoCours from './infoCours';

const InfoModerneDance = () => {
    const contentModern = { // Added 'const' keyword and colon after variable name
        // Added curly braces to enclose the content
        content: (
            <div>
                <h2>Qu'est-ce que la Danse Moderne ?</h2>
                <hr></hr>
                <p>La danse moderne est un style de danse qui s'est développé au début du XXe siècle comme une réaction contre les formes classiques et rigides du ballet traditionnel. Elle se caractérise par une grande liberté de mouvement, l'expression personnelle et l'innovation. Ce genre de danse fusionne divers styles et techniques, intégrant souvent des éléments de jazz, de danse contemporaine et même de danse urbaine.</p>

                <h3>Nos Cours et Ateliers</h3>
                <p>Nous proposons une variété de cours adaptés à tous les niveaux :</p>
                <ul>
                    <li>Cours Débutants : Pour ceux qui découvrent la danse moderne, ces cours introduisent les bases techniques et encouragent l'exploration personnelle.</li>
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
                    <li>Une Opportunité de Créativité : La danse moderne est un art en constante évolution, et nous encourageons chacun à exprimer sa propre créativité.</li>
                </ul>

                <h3>Contactez-Nous</h3>
                <p>Pour en savoir plus sur nos cours, événements et inscriptions, n'hésitez pas à nous contacter :</p>
                <p>Adresse : 123 Rue de la Danse, 75000 Paris</p>
                <p>Téléphone : 01 23 45 67 89</p>
                <p>Email : info@dansmoderne-asso.fr</p>
                <p>Rejoignez-nous et laissez-vous emporter par le rythme et l'expression de la danse moderne !</p>
                <br /><br />
            </div>
        )
    };

    return (
        <div>
            <InfoCours
                title="Moderne Dance"
                content={contentModern.content}
                image="https://i.pinimg.com/originals/7e/b8/b6/7eb8b6d2528dedade01925bb40bc8a9b.jpg"
            ></InfoCours>
        </div>
    );
};

export default InfoModerneDance;

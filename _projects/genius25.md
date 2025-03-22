---
layout: distill
title: GENIUS 2025
# date: 2025-03-26 17:00:00-0400
date: 2025-03-18 17:00:00-0400
description: Présentation par affiche pour la soirée scientifique GENIUS 2025

authors:
    - name: Gabriel Lauzier
      affiliations:
        name: Université de Sherbrooke

bibliography: posts.bib

img: assets/img/vector_field.png
importance: 1
category: posters
related_publications: false
---

# Guidage dynamique par champs vectoriel pour le suivi de trajectoire <a href="/assets/pdf/genius25_poster.pdf" target="_blank" rel="noopener noreferrer" class="btn z-depth-0 btn-pdf">PDF</a>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/zoomed_vector_field_over_trajectory_nodpi.gif" title="Vector Field Over a Trajectory" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Figure 1)</b> Champs vectoriel généré par diffusion de bruit basé sur des démonstrations d'experts pour une tâche de suivi de trajectoire. La région en bleu représente l'état le plus probable où le véhicule devrait se diriger pour satisfaire l'objectif.
</div>

## Résumé
La majorité des fonds marins reste inexplorée, en partie, en raison de la dépendance de l'humain pour collecter des
données dans un tel environnement. En effet, les ressources humaines sont limitées, surtout pour des acquisitions de
données prolongées. L'utilisation de véhicules de surface autonomes semble être efficace pour augmenter l'efficacité des
acquisitions de données, mais ces derniers restent limités en raison de l'environnement maritime hautement imprévisible
et non linéaire. L'apprentissage par renforcement se présente donc comme une solution prometteuse pour supporter les
activités d'exploration maritime.

L'apprentissage par renforcement pose cependant plusieurs défis comme le risque et les coûts liés à l'acquisition de
données et la difficulté à définir une fonction de récompense optimale. La résolution de ces défis résulte en des
architectures complexes et difficiles à implémenter. Une approche d'apprentissage par imitation pour le guidage dynamique
par champs vectoriels de véhicules de surface est donc proposée. Cette proposition consiste en la récupération d'un champ
vectoriel avec un modèle génératif par diffusion de bruit dans le but de guider le véhicule vers des états plus probable
observé lors de l'entraînement.

À terme, ce projet de maîtrise vise à rendre robuste, polyvalent et à simplifier l'architecture d'un système de contrôle pour
véhicules de surface autonome dans le but de faciliter les applications dans des environnements maritimes.

## Fondements théoriques
### Modèles génératifs par diffusion de bruit

Les modèles de diffusion probabiliste **cite ho dickenson song** font partie d'une classe de modèle génératif derrière les récents succès de modèles comme *StableDiffusion* **cite esser podell rombach** qui permet de générer des images à partir d'une requête textuelle. Ces modèles fonctionnent en procédant au débruitage itératif d'une image originalement bruitée jusqu'à l'obtention d'une image nette.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/diffusion_processes.png" title="Forward and Backward Diffusion" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Figure 2)</b> Processus de diffusion vers l'avant et l'arrière pour un modèle génératif par diffusion de bruit. <b>cite song_generative_2020</b>
</div>

<!-- Song et al. généralise ce concept en proposant un modèle de diffusion de bruit basé sur une fonction de score **cite song_generative_2020** et décrit le processus de diffusion avec une équation différentielle stochastique (*Stochastic Differential Equation* - SDE) d'Itô **cite song_score-based_2021**.

$$
\begin{equation} \label{eq:ito_sde}
    d\mathbf{x} = \mathbf{f}(\mathbf{x}, t)dt + g(\mathbf{x}, t)d\mathbf{w}
\end{equation}
$$

$$
\begin{equation} \label{eq:reverse_ito_sde}
    d\mathbf{x} = \left[\mathbf{f}(\mathbf{x}, t) - g^2(\mathbf{x}, t) s_\theta(\mathbf{x})\right]dt + g(t)d\hat{\mathbf{w}}
\end{equation}
$$

Ici, l'équation \ref{eq:ito_sde} est l'équation différentielle stochastique d'Itô pour la diffusion vers l'avant responsable d'ajouter du bruit à l'image original et l'équation \ref{eq:reverse_ito_sde} est l'équation différentielle stochastique d'Itô pour la diffusion vers l'arrière responsable de retirer le bruit de l'image. La fonction $f$ est déterministe et connue sous le nom de coeficient de dérive alors que $g$ décrit l'amplitude du bruit. La fonction de score $s_\theta(x)$ est définie comme étant le gradient de la log-vraisemblance de la densité de probabilité du modèle:

$$
\begin{equation} \label{eq:score_function}
    s_\theta(x) = \nabla \log p_\theta(x) = -\nabla f_\theta(x) - \underbrace{\nabla_x \log Z}_{= 0} = -\nabla f_\theta(x).
\end{equation}
$$

Cette dernière équation permet de s'affranchir des difficultées d'estimation de la densité de probabilité $p_\theta(x)$ dû à la constante de normalisation $Z$ qui est difficile à calculer pour une représentation de haute dimension. L'on retrouve cette dernière dans la densité de probabilit. $p_\theta(x)$, soit une distribution de Gibbs/Boltzmann:

$$
\begin{equation} \label{eq:boltzmann_distribution}
    p_\theta(x) = \frac{1}{Z} \exp(-f_\theta(x)).
\end{equation}
$$

Ici, $f_\theta(x)$ est la fonction d'énergie du modèle. La fonction de score $s_\theta(x)$ est donc le gradient de la fonction d'énergie du modèle et indique la direction dans laquelle les états de l'espace de représentation sont les plus probables. En général, l'on fait l'approximation de la fonction de score avec un réseau de neurones profond et l'on optimise ses paramètres avec une méthode par appariment de score **cite hyvarinen_score_2005**. -->

Dans le contexte de la génération d'images, chaque pixel est considéré comme une dimension de l'espace de représentation. Voici donc un exemple simplifié à seulement deux dimensions pour illustrer le concept de diffusion de bruit:

**TODO:** Insérer un GIF de diffusion vers l'avant et l'arrières.

### Apprentissage par imitation et modèles de diffusion

L'apprentissage par imitation aussi connu sous le nom d'apprentissage par la démonstration consiste à apprendre un comportement à partir d'exemples d'experts. L'avantage de cette approche est l'élimination du besoin de définir une fonction de récompense manuellement, une tâche difficile et coûteuse en temps. L'apprentissage par imitation est donc une approche prometteuse pour l'apprentissage de politiques de contrôle dans des environnements complexes.

Une technique récement à l'état de l'art dans ce domaine est l'approche proposée avec *Diffusion Policy* <d-cite key="chi_diffusion_2024"></d-cite>. Basé sur les modèles de diffusion de bruit, cette technique permet d'apprendre une politique de contrôle pour une tâche données. L'approche consiste à prédire la distribution de probabilité de l'action à prend à partir de l'état actuel du système. Cette distribution d'action est ensuite échantillonnée pour obtenir l'action à prendre.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://diffusion-policy.cs.columbia.edu/videos/highlight_sauce.mp4" title="Sauce Pour Task" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true playsinline=true muted=true %}
    </div>
</div>
<div class="caption">
    <b>Figure 2)</b> Deux bras manipulateur utilisant l'algorithme de <i>Diffusion Policy</i> <d-cite key="chi_diffusion_2024"></d-cite> pour étendre de la sauce à pizza malgré des perturbations externes. <d-footnote><a href="https://diffusion-policy.cs.columbia.edu/">https://diffusion-policy.cs.columbia.edu/</a></d-footnote>
</div>

Le problème avec cette approche réside dans le fonctionnement de l'algorithme de diffusion de bruit. La nature itérative du processus de diffusion inverse requiert plusieurs appels au réseau de neurones pour obtenir une action. C'est pour pour cette raison qu'il s'agit d'une méthode coûteuse en temps de calcul et peu adaptée pour des applications en temps réel comme le contrôle de véhicules autonomes.

## Guidage dynamique par champs vectoriel basé sur une fonction de score
Ce projet de recherche propose un algorithme de guidage dynamique par champs vectoriel pour le suivi de trajectoire. La fondation de cette idée repose sur l'utilisation de la fonction de score utilisée dans les modèles de diffusion de bruit tel que formulé par Song et al. **cite song_score-based_2021**:

$$
\begin{equation} \label{eq:score_function}
    s_\theta(x) = \nabla \log p_\theta(x) = -\nabla f_\theta(x) - \underbrace{\nabla_x \log Z}_{= 0} = -\nabla f_\theta(x).
\end{equation}
$$

Cette fonction de score est le gradient de la fonction d'énergie du modèle et indique donc la direction dans laquelle les états de l'espace de représentation sont les plus probables. L'idée est donc de récupérer cette fonction de score pour générer un champ vectoriel qui guidera le véhicule vers des états plus probables observés lors de l'entraînement.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/score_function.png" title="Fonction de score conditionnel à la classe cyan tiré d'une distribution multimodale" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Figure 3)</b> Fonction de score conditionnel à la classe cyan tiré d'une distribution multimodale. Les flèches indiquent la direction dans laquelle les états de la classe cyan sont les plus probables.
</div>

À la différence de *Diffusion Policy*, l'algorithme proposé ne requiert qu'un seul appel à la fonction de score pour contrôler le véhicule. Ce qui rend l'algorithme significativement plus rapide et adapté pour des applications en temps réel. Ceci est possible en raison du changement de d'espace de représentation par rapport à *Diffusion Policy*. Ce dernier utilise l'espace des actions en tant que représentation alors que l'algorithme proposé utilise l'espace de l'état du système. Ainsi, *Diffusion Policy* prédit une action, alors que l'algorithme proposé prédit un vecteur de direction.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include responsive_figure.liquid path="assets/img/path_following_architecture_horizontal_layout.svg" mobile_path="assets/img/path_following_architecture_vertical_layout.svg" title="Architecture de contrôle en boucle fermée" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <b>Figure 4) Architecture du système de suivi de trajectoire</b> 
</div>

Ce changement impose une l'utilisation d'un autre contrôleur à plus bas niveau pour transformer le vecteur de direction en une commande pour le véhicule. L'architecture de contrôle en boucle fermée est donc composée ainsi: À son entrée, l'algorithme proposée reçoit une trajectoire en position calculée préalablement par un module de planification de trajectoire. Ensuite, l'algorithme de guidage dynamique par champs vectoriel prédit un vecteur de direction vers l'état le prochain état le plus probable. Ce vecteur est ensuite utilisé par un module régulateur linéaire quadratique (*Linear-Quadratic Regulator* - LQR) qui tranforme le vecteur de direction en un vecteur de force à appliquer au système. Enfin, ce vecteur de force est transformé en une commande pour le contrôle du véhicule par un module de propulsion inverse.

## Conclusion

## Lectures complémentaires
 - <a href="https://yang-song.net/blog/2021/score/" target="_blank" rel="noopener noreferrer"><b>Generative Modeling by Estimating Gradients of the Data Distribution</b></a>: L'excellent blog de Yang Song sur les modèles génératifs qui explique en plus amples détails ces concepts.

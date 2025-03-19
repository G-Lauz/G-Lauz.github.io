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

<br>

## Travaux connexes
### <i>Diffusion Policy</i>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://diffusion-policy.cs.columbia.edu/videos/highlight_sauce.mp4" title="Sauce Pour Task" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true playsinline=true muted=true %}
    </div>
</div>
<div class="caption">
    <b>Figure 2)</b> Deux bras manipulateur utilisant l'algorithme de <i>Diffusion Policy</i> <d-cite key="chi_diffusion_2024"></d-cite> pour étendre de la sauce à pizza malgré des perturbations externes. <d-footnote><a href="https://diffusion-policy.cs.columbia.edu/">https://diffusion-policy.cs.columbia.edu/</a></d-footnote>
</div>

<br>

## Fondements théoriques

<br>

## Guidage dynamique par champs vectoriel basé sur une fonction de score

<br>

## Conclusion

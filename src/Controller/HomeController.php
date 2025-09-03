<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Contrôleur de la page d'accueil (dashboard)
 */
class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home', methods: ['GET'])]
    public function index(): Response
    {
    // Affiche une page d'accueil type dashboard avec accès rapide aux simulateurs
    // Ajoute des en-têtes HTTP de cache pour accélérer les visites suivantes (surtout en prod)
    return $this->render('home/index.html.twig');
    }
}

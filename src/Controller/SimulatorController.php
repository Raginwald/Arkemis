<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Contrôleur des simulateurs d'investissement
 */
class SimulatorController extends AbstractController
{
    /**
     * Page d'index des simulateurs
     */
    #[Route('/simulators', name: 'app_simulators_index', methods: ['GET'])]
    public function index(): Response
    {
    $response = $this->render('simulators/index.html.twig');
    $response->setPublic();
    $response->setMaxAge(300);
    $response->setSharedMaxAge(600);
    return $response;
    }

    /**
     * Simulateur de crédit immobilier (avec PTZ)
     */
    #[Route('/simulators/mortgage', name: 'app_simulators_mortgage', methods: ['GET'])]
    public function mortgage(): Response
    {
        $response = $this->render('simulators/mortgage.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }

    /**
     * Simulateur patrimoine - Résidence principale
     */
    #[Route('/simulators/primary-residence', name: 'app_simulators_primary_residence', methods: ['GET'])]
    public function primaryResidence(): Response
    {
        $response = $this->render('simulators/primary_residence.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }

    /**
     * Simulateur patrimoine - Investissement locatif
     */
    #[Route('/simulators/rental-investment', name: 'app_simulators_rental_investment', methods: ['GET'])]
    public function rentalInvestment(): Response
    {
        $response = $this->render('simulators/rental_investment.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }

    /**
     * Simulateur patrimoine - Placement en bourse
     */
    #[Route('/simulators/stock-investment', name: 'app_simulators_stock_investment', methods: ['GET'])]
    public function stockInvestment(): Response
    {
        $response = $this->render('simulators/stock_investment.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }

    /**
     * Simulateur - Louer sa RP + investir l'apport
     */
    #[Route('/simulators/rent-plus-invest', name: 'app_simulators_rent_plus_invest', methods: ['GET'])]
    public function rentPlusInvest(): Response
    {
        $response = $this->render('simulators/rent_plus_invest.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }

    /**
     * Comparateur - Acheter vs Louer
     */
    #[Route('/simulators/buy-vs-rent', name: 'app_simulators_buy_vs_rent', methods: ['GET'])]
    public function buyVsRent(): Response
    {
        $response = $this->render('simulators/buy_vs_rent.html.twig');
        $response->setPublic();
        $response->setMaxAge(300);
        $response->setSharedMaxAge(600);
        return $response;
    }
}

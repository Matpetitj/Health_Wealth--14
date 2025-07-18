# Health Wealth

**Health Wealth** est une application RH permettant de créer et gérer une base d’employés via une interface utilisateur moderne. Elle a été développée dans le cadre du parcours *Développeur Front-End* d’OpenClassrooms.

## ✨ Fonctionnalités

- Formulaire de création d’un employé avec validation
- Sélecteurs de date ergonomiques avec `react-datepicker`
- Ajout d’employés au store global via `Redux Toolkit`
- Affichage des employés dans un tableau interactif :
  - Tri croissant/décroissant
  - Pagination dynamique (1 à 10 lignes par page)
  - Recherche globale
  - Navigation entre les pages
- Modale de confirmation personnalisée avec une librairie externe

## 🛠️ Technologies utilisées

- **React**
- **Redux Toolkit** & `react-redux`
- **React Router DOM**
- **@tanstack/react-table** (tableau avancé)
- **Sass** (SCSS)
- **React Datepicker**
- Librairie externe : [`djyn-custom-lib-modal`](https://www.npmjs.com/package/djyn-custom-lib-modal)

## 📦 Installation

```bash
git clone https://github.com/votre-utilisateur/health-wealth.git
cd health-wealth
npm install
npm run dev

## 📚 Librairie externe personnalisée

Ce projet utilise une modale personnalisée développée pour l’occasion et publiée sur npm :

npm install djyn-custom-lib-modal


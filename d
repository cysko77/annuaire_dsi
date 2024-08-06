#!/usr/bin/env bash

ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

options=(
  "Demarrer Application"
  "Arreter Application"
  "Revoir les options"
  "Redemarrer Api"
  "Debug"
  #"Changer port web"
  #"Changer port api"
  "Afficher les containers Docker"
  "Supprimer un container Docker"
  "Arreter tous les containers Docker"
  #"Liste des ports utilisés"
  "Afficher les images Docker"
  #"Supprimer une image Docker"
  "Quitter"
)

dc_file="docker-compose.dev.yml"

function change_port_web {
  read -p $'\e[33m$ ⬤ Entrez le port web [Defaut: 3000]: \e[0m' port
  echo "Nouveau port attribué : $port"
  export SILL_WEB_PORT=${port}
}

function reboot_api {
  printf "${GREEN} ⬤ Restart Api en cours ...${NC}\r\n"
  docker compose -f ${dc_file} restart api && printf "${GREEN} ✔ Restart Api terminé${NC}\r\n"
}

function change_port_api {
  read -p $'\e[33m$ ⬤ Entrez le port de l\'api [Defaut: 3084]: \e[0m' port
  echo "Nouveau port attribué : $port"
  export SILL_API_PORT=${port}
}

function start_app {
  printf "${GREEN} ⬤ Demarrage de l'application en cours ...${NC}\r\n"
  [[ "$(docker compose -f ${dc_file} ps | grep api | wc -l)" -gt "0" ]] && docker compose -f ${dc_file} down
  docker compose -f ${dc_file} up -d && printf "\r\n${GREEN} ✔${NC} Veuillez patienter quelques secondes "
  $(curl --head --silent --fail "http://localhost:${SILL_WEB_PORT}")
  x=$?
  while [[ $x -ne 0 ]]; do
    sleep 2
    curl -m 1 --head --silent --fail http://localhost:${SILL_WEB_PORT} >/dev/null
    x=$?
    printf "${ORANGE}...${NC}"
  done
  printf "\r\n${GREEN} ✔${NC} Annuaire si inter ARS est dispo via ${ORANGE}http://localhost:${SILL_WEB_PORT}${NC}\r\n"
}

function stop_app {
  printf "${GREEN} ⬤ Arrêt de l'application en cours ...${NC}\r\n"
  [[ "$(docker compose -f ${dc_file} ps | grep api | wc -l)" -gt "0" ]] && docker compose -f ${dc_file} down && docker compose -f ${dc_file} down --volumes || echo " - Pas de container lancé !!!"
}

function show_docker_images {
  printf "${GREEN} ⬤ Liste des images Docker:${NC}\r\n"
  docker images
}

function show_debug {
  printf "${GREEN} ⬤ Affichage du dedug:${NC}\r\n"
  docker compose -f ${dc_file} logs
}

function remove_docker_image {
  read -p $'\e[33m$ ⬤ Entrez l\'Id ou le nom de l\'image à supprimer: \e[0m' image_id
  echo "Image supprimée: $image_id"
  docker rmi "$image_id"
}

function show_docker_containers {
  printf "${GREEN} ⬤ Liste des  containers Docker:${NC}\r\n"
  docker ps -a
}

function remove_docker_container {
  read -p $'\e[33m$ ⬤ Entrez l\'Id ou le nom du container à supprimer: \e[0m' container_id
  echo "Container supprimé: $container_id"
  docker rm -f "$container_id"
}

function stop_all_containers {
  printf "${GREEN} ⬤ Arrêt de tous les containers Docker:${NC}\r\n"
  docker stop $(docker ps -aq)
}

function reprint_options {
  echo "Options valides:"
  for index in "${!options[@]}"; do
    echo "$((index + 1))) ${options[index]}"
  done
}

function list_ports {
  echo "Liste des ports utilisés:"
  ss -ltn | grep LISTEN | grep 0.0.0.0:[0-9][0-9] | awk 'BEGIN{FS=" "} {print $4}' | awk 'BEGIN{FS=":"} {print $2}'
}

echo ""
PS3=$'\r\n\e[33m ---> Entrez votre choix:\e[0m\r\n'
select option in "${options[@]}"; do
  case $option in
  "Demarrer Application")
    start_app
    ;;
  "Arreter Application")
    stop_app
    ;;
  "Redemarrer Api")
    reboot_api
    ;;
  "Debug")
    show_debug
    ;;
  "Afficher les images Docker")
    show_docker_images
    ;;
  "Changer port web")
    change_port_web
    ;;
  "Changer port api")
    change_port_api
    ;;
  "Supprimer une image Docker")
    remove_docker_image
    ;;
  "Afficher les containers Docker")
    show_docker_containers
    ;;
  "Supprimer un container Docker")
    remove_docker_container
    ;;
  "Arreter tous les containers Docker")
    stop_all_containers
    ;;
  "Liste des ports utilisés")
    list_ports
    ;;
  "Revoir les options")
    reprint_options
    ;;
  "Quitter")
    break
    ;;
  *)
    echo "Options invalide. Veuillez résessayer."
    ;;
  esac
done

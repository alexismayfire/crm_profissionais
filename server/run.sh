#!/usr/bin/env bash

export DOCKER_UID=$(id -u)
export DOCKER_GID=$(id -g)
base_cmd="docker-compose -f local.yml"
managepy_cmd="${base_cmd} run django python manage.py"
migration_message="Digite o nome de um app, de vários apps separados por um espaço, ou deixe em branco para gerar de todos os apps."

function execute {
    echo $1
    case $1 in
        "run server")
            ${base_cmd} up;;
        "rebuild and run server")
            ${base_cmd} up --build;;
        makemigrations)
            echo ${migration_message}
            echo "Usando apenas um app, é possível digitar um nome específico para a migração (recomendado): "
            read -a apps
            if (( ${#apps[@]} == 1 )); then
                echo "Digite um nome para a migração do app '${apps[@]}' (espaços serão convertidos em _): "
                read migration_name
                ${managepy_cmd} makemigrations ${apps[@]} --name=${migration_name// /_}
            else
                ${managepy_cmd} makemigrations ${apps[@]}
            fi;;
        migrate)
            echo ${migration_message}
            read -a apps
            ${managepy_cmd} migrate ${apps[@]};;
        test)
            ${base_cmd} run django pytest;;
        "django shell")
            ${managepy_cmd} shell;;
        "create superuser")
            ${managepy_cmd} createsuperuser;;
        *)
            echo "Opção inválida!"
        esac
}

if [ "$*" != "" ]; then
    execute "$*"
else
    echo "Escolha a opção que deseja rodar localmente: "
    select option in "run server" "rebuild and run server" makemigrations migrate test "create superuser"
    do
    execute "${option}"
    break
    done
fi

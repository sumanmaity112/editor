#!/bin/sh -x -e

PATH_OF_CURRENT_SCRIPT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $PATH_OF_CURRENT_SCRIPT/vagrant_functions.sh
#USER=jss
USER=bahmni

run_in_vagrant -c "sudo rm -rf config_editor"
run_in_vagrant -c "sudo ln -s /bahmni/json-editor/dist/ /var/www/config_editor"
run_in_vagrant -c "sudo chown -h ${USER}:${USER} /var/www/config_editor"

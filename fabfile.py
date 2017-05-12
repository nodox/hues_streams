from fabric.api import run, sudo, local, env
from fabric.context_managers import cd

env.user = "rails"
env.hosts = [
  'huesstartup.com'
]


env.skip_bad_hosts = True


def start_app(cluster_mode=False):
  with cd('demo_598'):

    """Start app with specified number of CPUs"""
    if cluster_mode:
      sudo('pm2 start bin/www -i max --watch')
    else:
      sudo('pm2 start bin/www --watch')

def install_deps():
  with cd('hues_streams'):
    run('npm install')

def restart_app():
  with cd('hues_streams'):
    sudo('pm2 restart www')

def deploy():
  with cd('hues_streams'):
    sudo('git pull')
    sudo('npm run build')



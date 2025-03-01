

############ RUN THIS CODE AT THE VERY FIRST ##############################
################# RUN IT ONLY ONCE TO INSTALL ALL THE NECESSARY LIBRARIES ####################

##IF ANY ERROR OCCURS RELATED TO opencv.imshow, then run this command on the terminal "pip install --upgrade opencv-python"


import asyncio
import sys

# List of packages to install
packages = ['opencv-python-headless', 'datetime', 'os', 'ultralytics']

async def install_packages(packages):
    for package in packages:
        # Run pip install command using asyncio.subprocess
        process = await asyncio.create_subprocess_exec(
            sys.executable, '-m', 'pip', 'install', package,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE)

        # Wait for the installation to complete
        stdout, stderr = await process.communicate()

        if process.returncode == 0:
            print(f'Successfully installed {package}')
        else:
            print(f'Error installing {package}: {stderr.decode().strip()}')



# Run the install coroutine
asyncio.run(install_packages(packages))

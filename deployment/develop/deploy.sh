echo "Deploying application >> Develop"

# Install/update dependecies
echo "Install/update dependecies"
yarn install --production --frozen-lockfile

# Copy env file
echo "Copy env file"
cp ./env/.env.develop ./.env

# Build static file
echo "Build static file"
yarn build

# Copy htaccess file
echo "Copy env file"
cp ./.htaccess ./build
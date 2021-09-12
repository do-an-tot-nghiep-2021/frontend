echo "Deploying application >> Production"

# Install/update dependecies
echo "Install/update dependecies"
yarn install --production --frozen-lockfile

# Copy env file
echo "Copy env file"
cp ./env/.env.production ./.env

# Build static file
echo "Build static file"
yarn build

# Copy htaccess file
echo "Copy env file"
cp ./.htaccess ./build
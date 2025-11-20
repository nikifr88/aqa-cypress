FROM cypress/browsers:node-22.21.0-chrome-141.0.7390.107-1-ff-144.0-edge-141.0.3537.92-1

WORKDIR /e2e

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "cypress:qautoFirefox"]
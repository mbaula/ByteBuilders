# ByteBuilder

ByteBuilder is a specialized blogging platform designed for software engineers and technology enthusiasts. In a world brimming with technological advancements, ByteBuilder serves as a dedicated space for sharing insights, challenges, and discoveries in the realm of cutting-edge technology.

**NOTE**: This is for college project (do not make contributions unless you are part of Group 5 - COMP 229 Sec. 003)

## Installation

Setting up ByteBuilder for development or personal use is straightforward:

1. **Clone the repository:**

```bash
git clone https://github.com/mbaula/ByteBuilder.git
```

2. **Install dependencies:**
Navigate to the project directory and run:
```bash
npm install
```

3. **Configuration:**
Create a .env file in the root directory based on the `.env.example` provided:
```.env
MONGODB_URI=
MONGODB_URI_TEST=
PORT= 
```

## Running Tests:
Before contributing, please ensure to run the tests against a separate test database to avoid affecting any development or production data. Configure the MONGODB_URI_TEST environment variable to point to your test database when running tests:
```bash 
npm test 
```
This helps in ensuring that your changes do not break existing functionality and adheres to the expected behavior of the application.

## To contribute:
1. Fork the repository.
2. Create a new branch for your feature or fix (e.g., `feature_add_login`, `fix_typo_in_post`).
3. Run tests to ensure your changes do not introduce any new issues.
4. Commit your changes.
5. Push to your fork and submit a pull request.

When submitting a pull request, please provide a clear description of the changes and any relevant issue numbers.

## Screenshots:

![image](https://github.com/mbaula/ByteBuilders/assets/57877999/87d1497d-f452-45ac-b4e7-0f2e2221ee14)
![image](https://github.com/mbaula/ByteBuilders/assets/57877999/3d3cff56-8436-4e37-87d9-e20a089540c9)
![image](https://github.com/mbaula/ByteBuilders/assets/57877999/88929a44-d5fd-4a56-940e-cca22aac8158)
![image](https://github.com/mbaula/ByteBuilders/assets/57877999/d075933e-4bc7-4756-bd62-3ac36827ab41)
![image](https://github.com/mbaula/ByteBuilders/assets/57877999/b46520fa-731d-41cb-bd54-afd7a68f95fe)





        const canvas = document.getElementById('renderCanvas');
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = async () => {
            const scene = new BABYLON.Scene(engine);

            // Камера с возможностью вращения
            const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);

            // Свет
            const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

            // Создание куба
            const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);

            // Создание материала и загрузка текстуры
            const material = new BABYLON.StandardMaterial('material', scene);
            const textureUrl = 'https://i.postimg.cc/63FJT0hZ/Joxi.jpg';
            const texture = new BABYLON.Texture(textureUrl, scene, false, true, undefined, undefined, undefined, () => {
                // Обработка окончания загрузки текстуры
                document.getElementById('loading').style.display = 'none'; // Скрыть индикатор загрузки
                box.material = material; // Назначаем материал на куб
            });

            material.diffuseTexture = texture; // Назначаем текстуру материалу

            box.material = material; // Применяем материал к кубу

            // Запуск цикла рендеринга
            engine.runRenderLoop(() => {
                scene.render();
            });

            window.addEventListener('resize', () => {
                engine.resize();
            });
        };

        createScene();

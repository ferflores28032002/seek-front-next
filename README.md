# Trece software - NEXT.JS - NODE.JS (TYPESCRIPT)

**Demo:** 



## Resumen

El proyecto utiliza Next.js, SWR para la obtención de datos, TypeScript para tipado estático y Tailwind CSS para estilización junto con ui.shadcn. Cypress se utiliza para pruebas de extremo a extremo.

La aplicación está desplegada en Netlify y se puede acceder [aquí]

## Empezando

Para ejecutar el servidor de desarrollo, utiliza el siguiente comando:
```
yarn dev
```

Luego, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Pruebas de Extremo a Extremo con Cypress

Cypress se utiliza para pruebas de extremo a extremo. Para ejecutar las pruebas de Cypress, utiliza el siguiente comando:

```
cypress:open
```

Esto abrirá el Cypress Test Runner, permitiéndote seleccionar y ejecutar pruebas de forma interactiva.

## ¿Por qué Next.js?

Next.js fue elegido para este proyecto debido a su soporte integrado para renderizado del lado del servidor, generación de sitios estáticos y rutas de API. Ofrece un excelente rendimiento desde el principio y simplifica el proceso de desarrollo con características como la división automática de código y la sustitución de módulos en caliente.

## ¿Por qué React Query?

Usar React Query en un proyecto ofrece varios beneficios que lo convierten en una herramienta poderosa para la gestión de la obtención, almacenamiento en caché, sincronización y actualización de datos en aplicaciones React. Aquí te explico las razones clave para preferir React Query:

1. **Manejo Completo del Estado Asíncrono**:
   React Query proporciona un sistema robusto para manejar estados asíncronos como carga, éxito, error y reintento. Esto es especialmente útil para manejar solicitudes HTTP donde el estado de la petición debe reflejarse de manera clara en la interfaz de usuario.

2. **Almacenamiento en Caché Avanzado**:
   React Query almacena los datos en caché automáticamente y los mantiene sincronizados en toda la aplicación, lo que reduce la cantidad de solicitudes redundantes y mejora el rendimiento. Además, ofrece un control detallado sobre la invalidación y revalidación de caché.

3. **Sincronización de Datos en Tiempo Real**:
   React Query permite sincronizar datos entre múltiples componentes en tiempo real sin esfuerzo adicional. Si un dato cambia en un lugar, se refleja automáticamente en todos los componentes que lo consumen.

4. **Mutaciones y Sincronización Automática**:
   React Query facilita la gestión de mutaciones (como POST, PUT, DELETE) y actualiza automáticamente el estado de la caché después de una mutación exitosa. Esto asegura que la UI siempre esté sincronizada con el backend sin necesidad de código adicional.

5. **Control y Personalización**:
   React Query ofrece más control y personalización en comparación con otras bibliotecas como SWR. Puedes configurar estrategias de reintento, políticas de revalidación, y mucho más, según las necesidades específicas de tu aplicación.

6. **Soporte para Paginación y Prefetching**:
   React Query tiene soporte nativo para paginación, infinite scrolling, y prefetching de datos, lo que permite cargar datos de manera anticipada para mejorar la experiencia del usuario.

7. **Integración con DevTools**:
   React Query Devtools ofrece una poderosa herramienta para visualizar y depurar el estado de las peticiones, mutaciones y caché, facilitando el desarrollo y la optimización.

8. **Ecosistema y Comunidad**:
   React Query cuenta con una comunidad activa y una documentación extensa, lo que facilita el aprendizaje y la resolución de problemas. Además, su ecosistema está en constante crecimiento, con nuevas características y mejoras continuas.

En resumen, React Query es una opción excelente cuando se necesita una solución completa y flexible para manejar la obtención y sincronización de datos en aplicaciones React, especialmente en proyectos de gran escala o con requerimientos complejos.

## ¿Por qué Tailwind CSS y UI.SHADCN?

Tailwind CSS es un framework de CSS de utilidades que simplifica el proceso de estilización al proporcionar un conjunto de clases de utilidades predefinidas. Promueve la consistencia y el desarrollo rápido al tiempo que permite una personalización fácil. Además, su función de purga garantiza que solo se incluya el CSS necesario en la compilación final, optimizando el rendimiento.

## Conclusión

El proyecto ammper-app aprovecha tecnologías modernas y mejores prácticas para ofrecer una aplicación web robusta y de alto rendimiento. Al utilizar Next.js, SWR, Cypress, Tailwind CSS y TypeScript, el proyecto logra un equilibrio entre la productividad del desarrollador y la experiencia del usuario.
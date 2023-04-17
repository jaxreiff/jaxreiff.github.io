import { FC } from "react";

import { ShaderDemo } from "~src/common/shaderDemo/shaderDemo.component";
import { ShaderViewProps } from "~src/common/shaderView/shaderView.component";

import vertexShader1 from "~src/assets/shaders/shader1.vert";
import fragmentShader1 from "~src/assets/shaders/shader1.frag";
import vertexShader2 from "~src/assets/shaders/shader2.vert";
import fragmentShader2 from "~src/assets/shaders/shader2.frag";

const Shaders: FC = () => (
  <section>
    {(
      [
        {
          vertexShader: vertexShader1,
          fragmentShader: fragmentShader1,
          primitive: "triangle strip",
          position: [
            [-1.0, -1.0, +0, +1],
            [+1.0, -1.0, +0, +1],
            [-1.0, +1.0, +0, +1],
            [+1.0, +1.0, +0, +1],
          ],
        },
        {
          vertexShader: vertexShader2,
          fragmentShader: fragmentShader2,
          primitive: "triangle strip",
          position: [
            [-0.7, -0.7, +0, +1],
            [+0.7, -0.7, +0, +1],
            [-0.7, +0.7, +0, +1],
            [+0.7, +0.7, +0, +1],
          ],
        },
      ] as ShaderViewProps[]
    ).map((props, index) => (
      <ShaderDemo key={index} {...props} />
    ))}
  </section>
);

export default Shaders;

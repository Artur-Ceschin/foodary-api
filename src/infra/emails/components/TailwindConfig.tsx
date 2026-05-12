import React from "react";
import { Tailwind } from "react-email";

interface ITailWindConfig {
  children: React.ReactNode
}

export function TailwindConfig({ children }: ITailWindConfig) {

  return (
    <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                foodiary: {
                  green: '#64A30D'
                },
                gray: {
                  400: '#A1A1A1'
                }
              }
            }
          }
        }}
      >
        { children }
      </Tailwind>
  )
}

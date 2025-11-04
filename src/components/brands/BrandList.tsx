import React, { useEffect, useState } from 'react';


export interface Brand {
    id?: number;                  // opcional para novos cadastros
    nomeDesc: string;             // nome ou descrição da marca
    status?: "ATIVADO" | "INATIVO"; // StatusGeral
    empresa: { id: number };      // empresa dona da marca
}

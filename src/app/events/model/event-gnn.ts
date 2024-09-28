export interface RecommendedEvent {
  id: number;
  usuario_registro: number;
  fecha_creacion: string;
  usuario_modificacion: number;
  fecha_modificacion: string;
  archivado: boolean;
  compañia: string;
  descripcion: string;
  fecha_fin: string;
  url_img: string;
  costo: number;
  compartible: boolean;
  fecha_inicio: string;
  titulo: string;
  url_evento: string;
  categoria_id: number;
  owner_id: number;
  region_id: number;
}

export interface RecommendedEventsResponse {
  recommended_events: RecommendedEvent[];
}

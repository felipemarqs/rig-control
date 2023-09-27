export default function formatTime(time: string) {
  return time
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/^(\d{0,2})/, "$1:") // Adiciona : após os dois primeiros dígitos
    .replace(/:(\d{2}).*/, ":$1"); // Mantém apenas os dois dígitos após :
}

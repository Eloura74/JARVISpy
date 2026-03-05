import json
import httpx
from typing import Optional
from core.logger import get_logger
from core.config import settings

logger = get_logger("services.ha")

class HomeAssistantService:
    """
    Connecteur pour l'API REST de Home Assistant.
    Permet à J.A.R.V.I.S de contrôler les appareils domotiques (lumières, prises, capteurs...)
    via le token d'accès longue durée configuré dans les paramètres GUI.
    """

    @property
    def base_url(self) -> str:
        return settings.ha_url.rstrip('/')

    @property
    def headers(self) -> dict:
        return {
            "Authorization": f"Bearer {settings.ha_token}",
            "Content-Type": "application/json"
        }

    @property
    def is_configured(self) -> bool:
        return bool(settings.ha_url and settings.ha_token)

    def get_entity_state(self, entity_id: str) -> str:
        """
        Récupère l'état courant d'une entité Home Assistant (lumière, capteur, prise, etc.).
        entity_id : identifiant HA, ex: 'light.salon', 'switch.imprimante_3d', 'sensor.temperature_bureau'
        """
        if not self.is_configured:
            return "Erreur: Home Assistant n'est pas configuré. Veuillez renseigner l'URL et le Token dans Paramètres > Modules."

        try:
            url = f"{self.base_url}/api/states/{entity_id}"
            logger.info(f"Récupération de l'état de l'entité HA : {entity_id}")
            with httpx.Client(timeout=5.0, verify=False) as client:
                resp = client.get(url, headers=self.headers)
                resp.raise_for_status()
                data = resp.json()
                return json.dumps({
                    "entity_id": data.get("entity_id"),
                    "state": data.get("state"),
                    "friendly_name": data.get("attributes", {}).get("friendly_name", entity_id),
                    "attributes": {
                        k: v for k, v in data.get("attributes", {}).items()
                        if k in ["brightness", "temperature", "unit_of_measurement", "device_class"]
                    }
                }, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erreur HA get_state({entity_id}): {e}")
            return f"Erreur lors de la récupération de l'entité '{entity_id}': {str(e)}"

    def call_service(self, domain: str, service: str, entity_id: str, extra: Optional[str] = None) -> str:
        """
        Appelle un service Home Assistant pour contrôler une entité.
        
        Exemples typiques :
        - domain='light', service='turn_on', entity_id='light.salon'
        - domain='switch', service='toggle', entity_id='switch.prise_bureau'
        - domain='light', service='turn_on', entity_id='light.bureau', extra='{\"brightness\": 128}'
        """
        if not self.is_configured:
            return "Erreur: Home Assistant n'est pas configuré. Veuillez renseigner l'URL et le Token dans Paramètres > Modules."

        try:
            url = f"{self.base_url}/api/services/{domain}/{service}"
            body: dict = {"entity_id": entity_id}

            # Paramètres additionnels optionnels (ex: luminosité, température)
            if extra:
                try:
                    extra_data = json.loads(extra)
                    body.update(extra_data)
                except json.JSONDecodeError:
                    logger.warning(f"extra_params non parsable comme JSON : {extra}")

            logger.info(f"Appel HA: {domain}.{service} sur {entity_id}")
            with httpx.Client(timeout=5.0, verify=False) as client:
                resp = client.post(url, headers=self.headers, json=body)
                resp.raise_for_status()

            return json.dumps({
                "status": "success",
                "action": f"{domain}.{service}",
                "entity_id": entity_id
            })
        except Exception as e:
            logger.error(f"Erreur HA call_service({domain}.{service}, {entity_id}): {e}")
            return f"Erreur lors de l'appel du service Home Assistant: {str(e)}"

    def list_entities(self, domain_filter: str = "") -> str:
        """
        Liste les entités disponibles dans Home Assistant, avec filtre optionnel par domaine.
        domain_filter : ex: 'light', 'switch', 'sensor', 'climate', '' pour tout.
        """
        if not self.is_configured:
            return "Erreur: Home Assistant n'est pas configuré."

        try:
            url = f"{self.base_url}/api/states"
            logger.info(f"Listage des entités HA (filtre: '{domain_filter}')...")
            with httpx.Client(timeout=10.0, verify=False) as client:
                resp = client.get(url, headers=self.headers)
                resp.raise_for_status()
                all_states = resp.json()

            result = []
            for entity in all_states:
                eid = entity.get("entity_id", "")
                if domain_filter and not eid.startswith(f"{domain_filter}."):
                    continue
                result.append({
                    "entity_id": eid,
                    "state": entity.get("state"),
                    "friendly_name": entity.get("attributes", {}).get("friendly_name", eid)
                })

            if not result:
                return f"Aucune entité trouvée pour le domaine '{domain_filter}'."

            return json.dumps(result[:30], ensure_ascii=False)  # Max 30 pour économiser les tokens
        except Exception as e:
            logger.error(f"Erreur HA list_entities: {e}")
            return f"Erreur lors du listage des entités: {str(e)}"


# Instance Singleton
ha_service = HomeAssistantService()

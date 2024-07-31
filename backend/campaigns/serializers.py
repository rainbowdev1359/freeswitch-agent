from rest_framework import serializers
from .models import Agent, Campaign

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['id', 'name']

class CampaignSerializer(serializers.ModelSerializer):
    agents = AgentSerializer(many=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'type', 'budget', 'agents', 'dials', 'list', 'pickups', 'failed', 'busy', 'amount_spent', 'outcome', 'costOutcome']

    def create(self, validated_data):
        agents_data = validated_data.pop('agents')
        campaign = Campaign.objects.create(**validated_data)
        for agent_data in agents_data:
            agent, created = Agent.objects.get_or_create(**agent_data)
            campaign.agents.add(agent)
        return campaign

    def update(self, instance, validated_data):
        agents_data = validated_data.pop('agents')
        agents = (instance.agents).all()
        agents = list(agents)
        
        instance.name = validated_data.get('name', instance.name)
        instance.type = validated_data.get('type', instance.type)
        instance.budget = validated_data.get('budget', instance.budget)
        instance.dials = validated_data.get('dials', instance.dials)
        instance.list = validated_data.get('list', instance.list)
        instance.pickups = validated_data.get('pickups', instance.pickups)
        instance.failed = validated_data.get('failed', instance.failed)
        instance.busy = validated_data.get('busy', instance.busy)
        instance.amount_spent = validated_data.get('amount_spent', instance.amount_spent)
        instance.outcome = validated_data.get('outcome', instance.outcome)
        instance.costOutcome = validated_data.get('costOutcome', instance.costOutcome)
        instance.save()

        for agent_data in agents_data:
            agent = agents.pop(0)
            agent.name = agent_data.get('name', agent.name)
            agent.save()

        return instance
<script lang="ts">
  /**
   * Very early start on a Cards representation using https://sveltematerialui.com/demo/card/
  */
  import "svelte-material-ui/bare.css";
  import Card, { 
	Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons,
  } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import IconButton, { Icon } from "@smui/icon-button";

  let clicked = 0;
</script>

<h3>This is the cards representation</h3>
<div class="card-display">
  <div class="card-container">
    <Card>
      <PrimaryAction on:click={() => clicked++}>
        <Media class="card-media-16x9" aspectRatio="16x9">
          <MediaContent>
            <div
              style="color: #fff; position: absolute; bottom: 16px; left: 16px;"
            >
              <h2 class="mdc-typography--headline6" style="margin: 0;">
                A card with media.
              </h2>
              <h3 class="mdc-typography--subtitle2" style="margin: 0;">
                And a subtitle.
              </h3>
            </div>
          </MediaContent>
        </Media>
        <Content class="mdc-typography--body2">
          It's all in this card. It's a veritable smorgasbord of card features.
        </Content>
      </PrimaryAction>
      <Actions>
        <ActionButtons>
          <Button on:click={() => clicked++}>
            <Label>Action</Label>
          </Button>
          <Button on:click={() => clicked++}>
            <Label>Another</Label>
          </Button>
        </ActionButtons>
        <ActionIcons>
          <IconButton
            on:click={() => clicked++}
            toggle
            aria-label="Add to favorites"
            title="Add to favorites"
          >
            <Icon class="material-icons" on>favorite</Icon>
            <Icon class="material-icons">favorite_border</Icon>
          </IconButton>
          <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="Share">share</IconButton
          >
          <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="More options">more_vert</IconButton
          >
        </ActionIcons>
      </Actions>
    </Card>
  </div>

  <div class="card-container">
    <Card>
      <PrimaryAction on:click={() => clicked++}>
        <Media class="card-media-16x9" aspectRatio="16x9" />
        <Content class="mdc-typography--body2">
          <h2 class="mdc-typography--headline6" style="margin: 0;">
            A card with media.
          </h2>
          <h3
            class="mdc-typography--subtitle2"
            style="margin: 0 0 10px; color: #888;"
          >
            And a subtitle.
          </h3>
          It's all in this card. It's a veritable smorgasbord of card features.
        </Content>
      </PrimaryAction>
      <Actions>
        <ActionButtons>
          <Button on:click={() => clicked++}>
            <Label>Action</Label>
          </Button>
          <Button on:click={() => clicked++}>
            <Label>Another</Label>
          </Button>
        </ActionButtons>
        <ActionIcons>
          <IconButton
            on:click={() => clicked++}
            toggle
            aria-label="Add to favorites"
            title="Add to favorites"
          >
            <Icon class="material-icons" on>favorite</Icon>
            <Icon class="material-icons">favorite_border</Icon>
          </IconButton>
          <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="Share">share</IconButton
          >
          <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="More options">more_vert</IconButton
          >
        </ActionIcons>
      </Actions>
    </Card>
  </div>
</div>

<pre class="status">Clicked: {clicked}</pre>

<style>
	.card-container {
		display: inline-flex;
		width:380px;
		max-width: 100%;
		padding: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
		border: 1px solid var(--mdc-theme-text-hint-on-background);
	}
</style>

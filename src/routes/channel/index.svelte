<script lang="ts">
  import Header from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import { playerMaster, channelMaster, loadChannels } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import ChannelName from '/src/parts/ChannelName.svelte'
  import BigNumber from '/src/parts/BigNumber.svelte'
</script>

<Header title="チャンネル一覧" type="article" url="channel" description="ポケモンユナイトプレイヤのチャンネルの一覧" />
<h2>Channel</h2>

<h3>ToDo</h3>
<ul style="padding-left: 20px">
  <li>定期的にチャンネル情報を再取得する</li>
  <li>チャンネルIDが設定されてるのに情報取れてないものがあるかチェックする</li>
  <li>公式チャンネルなどもリストに入れる</li>
  <li>配信中のものがわかるようにし、上に持ってくる</li>
  <li>配信してなければ、最新動画の情報とか</li>
</ul>

{#if ($channelMaster || loadChannels())}
  <p><T>データ取得</T> {$channelMaster.stored_at.toLocaleString()}</p>
{/if}

<table style="table-layout: auto">
  <thead>
  </thead>
  <tbody class="triple">
    {#if Array.isArray($playerMaster.players) && $channelMaster}
      {#each $playerMaster.players as player}
        {@const channel = player.data?.youtube}
        {@const master = $channelMaster.list[(channel || [])[0]]}
        {#if channel && master}
          <tr>
            <td rowspan="3" style="width: 100px;">
              <img src={$channelMaster.list[channel[0]].thumbnail} alt="チャンネル画像" style="border-radius: 50%;"/>
            </td>
            <td class="tal">
              <T>チャンネル</T>
              <ChannelName channel_id={channel[0]} title={$channelMaster.list[channel[0]].title} />
            </td>
          </tr>
          <tr>
            <td class="tal">
              <T>プレイヤー</T>
              <PlayerName name={player.name} />
            </td>
          </tr>
          <tr>
            <td class="tal">
              <T>開設</T>
              <Date date={master.publishedAt} spacing={false} />
              <T>再生</T>
              <BigNumber num={master.viewCount} />
              {#if !!master.subscriberCount}
                <T>登録者</T>
                <BigNumber num={master.subscriberCount} />
              {/if}
              <T>動画</T>
              {master.videoCount.toLocaleString()}
            </td>
          </tr>
        {/if}
      {/each}
    {:else}
      <PlaceHolder />
    {/if}
  </tbody>
</table>